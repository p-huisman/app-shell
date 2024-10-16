import express from "express";
import {WebSocketServer} from "ws";
import serveIndex from "serve-index";
import http from "http";
import path from "path";
import fs from "fs";
import {networkInterfaces} from "os";
import esbuild from "esbuild";
import {copy} from "esbuild-plugin-copy";
import process from "process";

const projectRootDir = process.cwd();

const env = process.env.NODE_ENV || "development";

let connections;

function getIpAddresses() {
  const allifs = networkInterfaces();
  let ifs = [];
  for (const key in allifs) {
    allifs[key].forEach((i) => {
      if (i.family === "IPv4") {
        ifs.push(i.address);
      }
    });
  }
  return ifs ? ifs : [];
}

const app = express({strict: false});

app.use((req, res, next) => {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-methods", "*");
  res.setHeader("access-control-allow-headers", "*");
  next();
});

const server = http.createServer(app);
const wss = new WebSocketServer({clientTracking: false, noServer: true});

server.on("upgrade", function (request, socket, head) {
  if (!connections) {
    connections = new Set();
  }
  wss.handleUpgrade(request, socket, head, function (ws) {
    wss.emit("connection", ws, request);
  });
});

wss.on("connection", function (ws) {
  connections.add(ws);
  ws.on("close", function () {
    connections.delete(ws);
  });
});

const buildPlugin = {
  name: "build",
  setup: (build) => {
    build.onStart(() => {
      console.log(
        "ES build started " + build.initialOptions.entryPoints.join(", "),
      );
    });
    build.onEnd((result) => {
      console.log(
        "ES build finish " + build.initialOptions.entryPoints.join(", "),
      );
      if (broadcast) {
        broadcast(result ? result : {});
      }
      [...result.errors, ...result.warnings].forEach((element) => {
        console.log(element, "error");
      });
    });
  },
};

export async function startServer() {
  app.use(express.static("./dist"), serveIndex("./dist", {icons: true}));

  app.get("*", function (req, res) {
    res.status(404).sendFile(path.join(projectRootDir, "404.html"));
  });

  return new Promise((resolve) => {
    const port = 9090;
    const host = "0.0.0.0";

    server.listen(port, host, function () {
      if (!host || host === "0.0.0.0") {
        console.log(`Listening on http://localhost:${port ? port : 9000}`);
        getIpAddresses().forEach((ip) => {
          console.log(`Listening on http://${ip}:${port ? port : 9000}`);
        });
      } else {
        console.log(`Listening on http://${host}:${port ? port : 9000}`);
      }
      resolve();
    });
  });
}

function broadcast(data) {
  if (!connections) {
    return;
  }
  const messageData = JSON.stringify({
    errors: data.errors ? data.errors : [],
    warnings: data.warnings ? data.warnings : [],
    type: "build",
  });
  connections.forEach((ws) => {
    try {
      ws.send(messageData);
    } catch (e) {
      console.error(e);
    }
  });
}

const appShellBuildOptions = {
  entryPoints: [
    "./src/app-shell.tsx",
    "./src/apps/app-shell-oauth.tsx",
    "./src/apps/app-shell-dashboard.tsx",
  ],
  outdir: "dist",
  bundle: true,
  platform: "browser",
  format: "esm",
  target: "es6",
  external: ["react", "react-dom", "@griffel/react", "@fluentui/react-icons"],
  plugins: [buildPlugin],
  sourcemap: env === "production" ? false : "inline",
  sourcesContent: true,
  minify: env === "production",
  allowOverwrite: true,
};

const from = [
  "./src/index.html",
  "./src/app-shell.json",
];

const appShellLoaderBuildOptions = {
  entryPoints: ["./src/app-shell-loader.ts"],
  outdir: "dist",
  bundle: true,
  platform: "browser",
  format: "esm",
  target: "es2022",
  plugins: [
    copy({
      resolveFrom: projectRootDir,
      assets: {
        from,
        to: ["./dist"],
      },
      watch: env !== "production",
    }),
    copy({
      resolveFrom: projectRootDir,
      assets: {
        from: [
          "./src/assets/**/*",
        ],
        to: ["./dist/assets"],
      },
      watch: env !== "production",
    }),
    buildPlugin,
  ],
  sourcemap: env === "production" ? false : "inline",
  sourcesContent: true,
  minify: env === "production",
  allowOverwrite: true,
};

if (env === "development") {
  console.log("Watching for changes...");
  esbuild.context(appShellBuildOptions).then((ctx) => {
    ctx.watch();
  });
  esbuild.context(appShellLoaderBuildOptions).then((ctx) => {
    ctx.watch();
  });
}

async function main() {
  if (env === "development") {
    await startServer();
  }

  await esbuild.build(appShellBuildOptions);
  await esbuild.build(appShellLoaderBuildOptions);
  if (env === "production") {
    fs.copyFileSync(
      path.join(projectRootDir, "github-pages/index.html"),
      path.join(projectRootDir, "dist/index.html"),
    );
    fs.copyFileSync(
      path.join(projectRootDir, "github-pages/404.html"),
      path.join(projectRootDir, "dist/404.html"),
    );
    fs.copyFileSync(
      path.join(projectRootDir, "github-pages/assets/manifest.json"),
      path.join(projectRootDir, "dist/assets/manifest.json"),
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

import { makeStyles } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
  barndLogo: {
    width: "65px",
  },
});

export const Logo = () => {
  const styles = useStyles();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 96 65"
      className={styles.barndLogo}
    >
      <defs>
        <path id="a" d="M.475.407h57.467v18.557H.475z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#898E90"
          d="M27.432 39.225C18.612 44.631 11.625 46.422 0 44.926c13.605-1.856 18.13-5.825 28.097-9.392 4.97-1.814 7.265-2.214 9.371-.543-2.833.14-5.248 1.282-10.036 4.234m29.144-14.82C74.133 22.406 83.235 13.892 91.953.168c-13.109 12.94-28.795 17.812-40.99 22.28-5.81 2.144-7.899 5.878-8.438 9.526 2.531-2.868 7.28-6.833 14.05-7.57"
        />
        <path
          fill="#898E90"
          d="M52.485 40.18c-5.567.488-10.988-2.093-15.608-7.326-2.497-2.809-2.946-2.809-6.078-3.934 5.458-1.136 6.927.57 11.515 4.553 2.807 2.011 5.956 3.485 9.042 4.196 5.586.581 10.597-1.378 16.112-2.869.02 0-8.765 4.844-14.983 5.38"
        />
        <g transform="translate(13.348 45.69)">
          <mask id="b" fill="#fff">
            <use xlinkHref="#a" />
          </mask>
          <path
            fill="#1D8551"
            d="M10.06 11.942c3.128 0 6.055-2.113 6.055-5.59 0-3.476-2.927-5.735-6.055-5.735H.48L.476 16.024a2.733 2.733 0 0 0 2.734 2.733h2.733v-6.815h4.118zM5.942 8.494V4.142h2.465c1.395 0 2.176.897 2.176 2.176 0 1.28-.78 2.176-2.176 2.176H5.942zm28.184.289a2.733 2.733 0 0 1 2.733 2.733l-.004 5.897s-2.96 1.582-7.612 1.582c-6.508 0-10.64-3.696-10.64-8.926 0-7.468 4.991-9.662 10.383-9.662 4.882 0 7.533 1.342 7.533 1.342v4.212s-2.078-1.63-6.281-1.63c-4.204 0-6.044 2.798-6.044 5.594 0 2.796 2.54 5.848 7.9 4.64V8.78l2.032.004m21.083-.001a2.733 2.733 0 0 1 2.733 2.733l-.003 5.897s-2.96 1.582-7.613 1.582c-6.508 0-10.639-3.696-10.639-8.926 0-7.468 4.991-9.662 10.382-9.662 4.882 0 7.533 1.342 7.533 1.342v4.212s-2.077-1.63-6.28-1.63c-4.205 0-6.045 2.798-6.045 5.594 0 2.796 2.54 5.848 7.9 4.64V8.78l2.032.004"
            mask="url(#b)"
          />
        </g>
        <path
          fill="#1D8551"
          d="m85.072 60.044-4.99-6.088v7.758a2.733 2.733 0 0 1-2.734 2.733h-2.66v-18.14h4.869l5.675 6.816 5.656-6.816h4.87v15.407a2.734 2.734 0 0 1-2.733 2.733h-2.66v-10.49l-4.992 6.087h-.301"
        />
      </g>
    </svg>
  );
};
export default Logo;

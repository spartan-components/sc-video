import terser from "@rollup/plugin-terser";
import template from "rollup-plugin-html-literals";

export default {
  input: ["./src/sc-video.js"],
  output: [
    {
      format: "es",
      dir: "dist",
    },
    {
      entryFileNames: ({ name }) => `${name}.min.js`,
      format: "es",
      dir: "dist",
      plugins: [terser()],
    },
  ],
  plugins: [template()],
};

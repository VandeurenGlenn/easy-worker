import typescript from "@rollup/plugin-typescript";

export default {
  input: ['./src/worker.ts'],
  output: {
    dir: 'exports',
    format: 'es'
  },
  plugins: [
    typescript()
  ]
}
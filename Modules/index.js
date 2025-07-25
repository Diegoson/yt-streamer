const { spawn } = require("child_process")
const fs = require("fs")
const p = require("path")

const bin = p.join(__dirname, "../slice/yt-dlp")
const cook = p.join(__dirname, "../slice/cookies.txt")
const tmp = p.join(__dirname, "../temp")

const DownloadMusic = async (v) => {
  const f = p.join(tmp, "song.m4a")
  if (fs.existsSync(f)) fs.unlinkSync(f)
  return new Promise((res, rej) => {
    const o = p.join(tmp, "song.m4a")
    const a = [
      "-f", "bestaudio[ext=m4a]",
      "--cookies", cook,
      "-o", o,
      `https://www.youtube.com/watch?v=${v}`
    ]
    const x = spawn(bin, a)
    x.on("error", (e) => rej(e.message))
    x.stderr.on("data", (d) => console.error(d))
    x.on("close", (c) => {
      c === 0 ? res(o) : rej(c)
    })
  })
}

const DownloadVideo = async (v, q = "720") => {
  const f = p.join(tmp, "video.mp4")
  if (fs.existsSync(f)) fs.unlinkSync(f)
  return new Promise((res, rej) => {
    const o = p.join(tmp, "video.mp4")
    const a = [
      "-f", `bestvideo[height<=${q}]+bestaudio/best`,
      "--merge-output-format", "mp4",
      "--cookies", cook,
      "-o", o,
      `https://www.youtube.com/watch?v=${v}`
    ]
    const x = spawn(bin, a)
    x.on("close", (c) => {
      c === 0 ? res(o) : rej(c)
    })
    x.on("error", (e) => {
      console.error(e)
      rej(e.message)
    })
  })
}

module.exports = { DownloadMusic, DownloadVideo}

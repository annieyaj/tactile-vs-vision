# Tactile Sensors Are an Effective Substitute for Wrist Cameras in Contact-Rich or Occluded Manipulation

Project page for the paper. It is a plain static site (HTML, CSS and JS with no build step), served by GitHub Pages.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Adding media

Every image and video slot loads from a fixed path. If the file is missing, the page shows a gray "Coming soon" box; hover
over it to see the path it expects. Drop the file in at that path and it appears; no HTML edits are needed.

| Path | Section | Notes |
|---|---|---|
| `assets/videos/hero.mp4` | Hero | 20–35 s, muted loop, 16:9 |
| `assets/images/hero_poster.webp` | Hero | Poster frame; also used as the social preview image |
| `assets/videos/comparisons/t4_vision.mp4` / `t4_tactile.mp4` | Comparisons | Autonomous rollouts |
| `assets/videos/comparisons/t5_vision.mp4` / `t5_tactile.mp4` | Comparisons | |
| `assets/videos/comparisons/t6_vision.mp4` / `t6_tactile.mp4` | Comparisons | |
| `assets/videos/tasks/t1_block.mp4`, `t2_deformable.mp4`, `t3_straw.mp4`, `t4_bag.mp4`, `t5_plug.mp4`, `t6_wipe.mp4` | Tasks | Teleoperated data-collection clips |
| `assets/images/tasks/task_t1.webp` … `task_t6.webp` | Tasks | Video posters |
| `assets/images/results/success_rates.svg` | Results | Main chart |
| `assets/images/results/camera_ablation.svg` | Results | Wrist-camera ablation |
| `assets/videos/hardware/gripper_demo.mp4` | Hardware | 5–10 s |
| `assets/images/robot_setup.webp`, `gripper_closeup.webp`, `tactile_heatmap.webp` | Hardware | |
| `assets/paper/paper.pdf` | Paper button | |

To replace the stand-in pipeline diagram in the Method section, swap the `<figure class="pipeline">` block in
`index.html` for `<img src="assets/images/system_overview.svg" alt="...">`.

Encoding tip for web-friendly H.264 MP4 at 720p, with no audio and fast start:

```bash
ffmpeg -i in.mov -vf "scale=-2:720" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -an -movflags +faststart out.mp4
```

## Deploy (GitHub Pages)

1. Push this folder to the repo's `main` branch.
2. In the repo, go to **Settings → Pages → Build and deployment**, set **Source** to *Deploy from a branch*, choose
   `main` and `/ (root)`, and save.
3. The site goes live at `https://<user-or-org>.github.io/<repo>/`. All paths are relative, so no base-path config is needed.

`.nojekyll` turns off Jekyll processing so files are served as-is.

## Planning

See [`tactile_paper_website_plan.md`](tactile_paper_website_plan.md) for the content plan and pre-launch checklist.

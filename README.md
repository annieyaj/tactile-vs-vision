# Tactile Sensors Are an Effective Substitute for Wrist Cameras in Contact-Rich or Occluded Manipulation

**CoRL 2026 · 3rd Workshop on Dexterous Manipulation**

[Aijia Yang](https://annieyaj.github.io/), [Arsh Tangri](https://scholar.google.com/citations?user=mYwF_I4AAAAJ&hl=en), [Sergey Zakharov](https://zakharos.github.io/), [Krishna Murthy Jatavallabhula](https://krrish94.github.io/)
Toyota Research Institute

### [Project page](https://annieyaj.github.io/tactile-vs-vision/)

Learned manipulation policies often rely on wrist cameras for close-range feedback, but contact can stay hidden even
from a wrist camera. We add two low-cost tactile arrays to the gripper fingers and train a visuotactile ACT policy that
uses no wrist images. On three contact-rich tasks, adding a wrist camera improves success by 18.3–28.3 percentage
points over external vision alone, while adding tactile sensing instead improves it by 31.7–60.0 points.

## Citation

```bibtex
@inproceedings{yang2026tactile,
  title     = {Tactile Sensors Are an Effective Substitute for Wrist Cameras
               in Contact-Rich or Occluded Manipulation},
  author    = {Yang, Aijia and Tangri, Arsh and Zakharov, Sergey
               and Jatavallabhula, Krishna Murthy},
  booktitle = {3rd Workshop on Dexterous Manipulation,
               Conference on Robot Learning (CoRL)},
  year      = {2026}
}
```

---

## About this repository

This repository hosts the project page, a static site (HTML, CSS and JavaScript, with no build step) served by GitHub Pages.

```
index.html        page content
assets/css/       styles
assets/js/        video loading, comparison sync, BibTeX copy
assets/paper/     paper PDF
media/            videos, photos, figures, logos
```

The page layout is inspired by [Nerfies](https://nerfies.github.io/).

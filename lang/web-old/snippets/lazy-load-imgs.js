/* throw this on the page and use data-src instead of src on images
 * <img data-src="/foo.bar.png">
 * <noscript><img src="/foo.bar.png"></noscript>
 */

self.onload = (a) => {
  for (let b of document.querySelectorAll('img')) {
    if (c = b.dataset.src) b.src = c
  }
}

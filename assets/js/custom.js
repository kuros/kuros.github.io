document.addEventListener("DOMContentLoaded",function(){var e=[].slice.call(document.querySelectorAll("img.lazy")),n=!1,t=function(){!1===n&&(n=!0,setTimeout(function(){e.forEach(function(n){n.getBoundingClientRect().top<=window.innerHeight&&n.getBoundingClientRect().bottom>=0&&"none"!==getComputedStyle(n).display&&(n.src=n.dataset.src,n.classList.remove("lazy"),0===(e=e.filter(function(e){return e!==n})).length&&(document.removeEventListener("scroll",t),window.removeEventListener("resize",t),window.removeEventListener("orientationchange",t)))}),n=!1},200))};document.addEventListener("scroll",t),window.addEventListener("resize",t),window.addEventListener("orientationchange",t)}),$(document).ready(function(){(adsbygoogle=window.adsbygoogle||[]).push({})});
var article = document.querySelectorAll('article');

function computeHeight () {
    for (var i=0;i < article.length; i++)  {
    	article[i].style.height = window.outerHeight + 'px';
    }
}
computeHeight()
window.addEventListener('resize',computeHeight,false)
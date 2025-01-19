// 更新价格的函数
function updatePrice(price) {
    document.getElementById('price').innerHTML = `价格：${price}元`;
}

// 添加颜色选择互斥功能
function handleSelection(groupId) {
    const options = document.querySelectorAll(`#${groupId} .option`);
    options.forEach(option => {
        option.addEventListener('click', function() {
            options.forEach(opt => opt.classList.remove('selected'));  // 移除所有选中状态
            this.classList.add('selected');  // 仅当前项添加选中状态
        });
    });
}

window.onload = function() {
    handleSelection('color-options');  // 对颜色选项绑定互斥选择
    handleSelection('version-options');  // 对版本选项绑定互斥选择
};

// 获取图片滑动容器和按钮
const imageCarousel = document.querySelector('.image-carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

// 获取每张图片的宽度
const imageWidth = document.querySelector('.image-carousel img').clientWidth;
let currentIndex = 0;

// 左右滑动按钮事件
prevButton.addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        imageCarousel.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
    } else {
        // 如果到达第一个图片，循环回最后一张
        currentIndex = imageCarousel.children.length - 1;
        imageCarousel.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
    }
});

nextButton.addEventListener('click', function() {
    if (currentIndex < imageCarousel.children.length - 1) {
        currentIndex++;
        imageCarousel.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
    } else {
        // 如果到达最后一张图片，循环回第一张
        currentIndex = 0;
        imageCarousel.style.transform = `translateX(0)`;
    }
});

// 自动轮播（可选）
setInterval(function() {
    nextButton.click();
}, 5000);  // 每5秒自动切换到下一张图片

document.querySelector('.back-button').addEventListener('click', function() {
    window.history.back(); // 返回上一页
});

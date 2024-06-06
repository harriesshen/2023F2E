// 節流 多次的觸發只會執行第一次
const throttle = (callback, time) => {
  let runningTimer = false;
  return function (...args) {
    if (!runningTimer) {
      runningTimer = true;
      setTimeout(() => {
        console.log("in throttle");
        callback(...args);
        runningTimer = false;
      }, time);
    }
  };
};

// 設置滑動到內容時設置在header的active
const setHeaderActiveFromScroll = () => {
  const scrollPosition = window.scrollY; // 滾動軸移動距離
  document.querySelectorAll("nav a").forEach((a) => {
    const id = a.getAttribute("href").substring(1);
    const section = document.getElementById(id);
    const offset = 100; // header高度
    if (section) {
      const offsetTop = section.offsetTop; // offsetTop 離頂端有多遠
      const height = section.offsetHeight; // offsetHeight 元素高度
      if (a.classList.contains("active")) {
        a.classList.remove("active");
      }
      // 滾動軸移動距離 > 元素離頂端距離 - (元素高度/2) => 進入元素畫面一半
      // 元素頂端距離 + 元素高度 > 滾動軸距離
      // 代表還在元素內
      if (
        offsetTop - height / 2 - offset <= scrollPosition &&
        offsetTop + height / 2 - offset > scrollPosition
      ) {
        // console.log("offsetTop", offsetTop);
        // console.log("height", height);
        // console.log("scrollPosition", scrollPosition);
        a.classList.add("active");
      }
    }
  });
};

// 設置header fixed狀態下的class
const setHeaderFixedFromScroll = () => {
  const header = document.querySelector(".headerContainer");
  const beFixed = window.scrollY > 0;
  const isFixed = header.classList.contains("header-fixed");
  if (beFixed && !isFixed) {
    header.classList.add("header-fixed");
  }
  if (!beFixed && isFixed) {
    header.classList.remove("header-fixed");
  }
};

// 當header固定在螢幕上方時背景顏色變為透明
window.addEventListener(
  "scroll",
  throttle(() => {
    setHeaderActiveFromScroll();
    setHeaderFixedFromScroll();
  }, 500)
);

// 點擊navbar時滑動至section
document.querySelectorAll("nav a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("a", a);
    const id = a.getAttribute("href").substring(1);
    const section = document.getElementById(id);
    const allSection = document.querySelectorAll("nav a");
    allSection.forEach((s) => {
      if (s.classList.contains("active")) s.classList.remove("active");
    });
    a.classList.add("active");
    const offset = 100; // header高度
    window.scrollTo({
      top: section.offsetTop - offset,
      behavior: "smooth",
    });
  });
});

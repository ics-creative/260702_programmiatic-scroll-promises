const startButton = document.querySelector("#startTourButton");
const tourPanel = document.querySelector("#tourPanel");
const progressText = document.querySelector("#tourProgress");
const messageText = document.querySelector("#tourMessage");
const backButton = document.querySelector("#backButton");
const nextButton = document.querySelector("#nextButton");
const closeButton = document.querySelector("#closeButton");

// 現在のステップ
let currentStepIndex = 0;

const steps = [
  {
    selector: "#search",
    message: "Use search to find the report you need.",
  },
  {
    selector: "#sales",
    message: "This card shows the main sales number.",
  },
  {
    selector: "#chart",
    message: "The chart gives you a quick view of the trend.",
  },
  {
    selector: "#orders",
    message: "Recent orders help you check new activity.",
  },
  {
    selector: "#settings",
    message: "Settings let you choose how reports are sent.",
  },
];

const clearActiveTarget = () => {
  document.querySelector(".is-active")?.classList.remove("is-active");
};

const endTour = async () => {
  clearActiveTarget();
  tourPanel.close();
  progressText.textContent = "";
  messageText.textContent = "";

  await window.scrollTo({
    behavior: "smooth",
    top: 0,
  });
  // スクロール後にボタンを活性化
  startButton.removeAttribute("disabled");
};

const showStep = async (stepIndex) => {
  const step = steps[stepIndex];
  const target = document.querySelector(step.selector);

  clearActiveTarget();
  if (!tourPanel.open) {
    tourPanel.show();
  }

  currentStepIndex = stepIndex;
  // panelの中身を更新
  progressText.textContent = `Step ${stepIndex + 1} of ${steps.length}`;
  messageText.textContent = step.message;
  // ボタンの状態を更新
  backButton.disabled = stepIndex === 0;
  nextButton.textContent = stepIndex === steps.length - 1 ? "Finish" : "Next";

  // targetを画面中央の位置を計算
  const centerY =
    target.offsetTop -
    window.innerHeight / 2 +
    target.getBoundingClientRect().height / 2;

  // scrollIntoView()を使いたいが、2026年7月時点ではPromiseが即時解決されているようなのでscrollToで代替
  await window.scrollTo({
    behavior: "smooth",
    top: centerY,
  });

  // スクロール後にactiveにする
  target.classList.add("is-active");
};

startButton.addEventListener("click", () => {
  startButton.setAttribute("disabled", true);
  showStep(0);
});

backButton.addEventListener("click", () => {
  if (currentStepIndex > 0) {
    showStep(currentStepIndex - 1);
  }
});

nextButton.addEventListener("click", () => {
  if (currentStepIndex === steps.length - 1) {
    endTour();
    return;
  }

  showStep(currentStepIndex + 1);
});

closeButton.addEventListener("click", () => {
  endTour();
});

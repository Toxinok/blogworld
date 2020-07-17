export default function Slider(mainBlock) {
  this.controlsSlider = function (leftArrow, rightArrow) {
    leftArrow.addEventListener('click', () => {
      this.sliderLeft();
    });

    rightArrow.addEventListener('click', () => {
      this.sliderRight();
    });
  };

  this.autoSlide = function (buttonBlock) {
    let sliderTimer = setInterval(this.sliderRight, 2000);
    mainBlock.addEventListener('mouseenter', () => {
      clearInterval(sliderTimer);
    });
    mainBlock.addEventListener('mouseleave', () => {
      sliderTimer = setInterval(this.sliderRight, 2000);
    });

    if (buttonBlock) {
      buttonBlock.addEventListener('mouseenter', () => {
        clearInterval(sliderTimer);
      });
      buttonBlock.addEventListener('mouseleave', () => {
        sliderTimer = setInterval(this.sliderRight, 2000);
      });
    }
  };
}

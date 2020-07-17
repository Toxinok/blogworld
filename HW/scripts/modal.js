(function ($) {
  $.fn.modalWindow = function (options) {
    this.options = {
      type: options.type,
      appendTo: options.appendTo,
      message: options.message,
      buttonsNumber: options.buttonsNumber,
      confirmCallback: options.confirmCallback,
    };

    if (this.options.appendTo === 'body') {
      setTimeout(() => {
        this.createModalWindow();
      }, 10000);
    } else if (this.options.appendTo === 'button') {
      this.click(() => {
        this.createModalWindow();
      });
    }

    // eslint-disable-next-line max-statements
    this.createModalWindow = () => {
      const modal = $('<div/>').addClass('modal');
      const modalContent = $('<div/>').addClass('modal__content');
      const modalClose = $('<div/>')
        .html('&times;')
        .addClass('modal__close');
      const modalText = $('<h3/>')
        .text(this.options.message)
        .addClass('modal__text');

      let typeColor;
      switch (options.type) {
        case 'info':
          typeColor = 'orange';
          break;
        case 'error':
          typeColor = 'red';
          break;
        case 'success':
          typeColor = 'green';
          break;
      }

      modalText.css('border-top', `3px solid ${typeColor}`);
      const modalOk = $('<button/>')
        .text('Ok')
        .addClass('button modal__button--ok');

      modalContent.append(modalClose, modalText, modalOk);

      if (this.options.buttonsNumber === 2) {
        const modalCancel = $('<button/>')
          .text('Cancel')
          .addClass('button modal__button modal__button--cancel');
        modalContent.append(modalCancel);
        modalCancel.click(() => {
          modal.remove();
          $('body').css('overflow', 'auto');
        });
      }

      modal.append(modalContent);

      $('body').append(modal);
      $('body').css('overflow', 'hidden');

      modalClose.click(() => {
        modal.remove();
        $('body').css('overflow', 'auto');
      });

      modalOk.click(() => {
        if (this.options.confirmCallback) {
          this.options.confirmCallback();
        }
        modal.remove();
        $('body').css('overflow', 'auto');
      });

      modal.click(function (event) {
        if (event.target === this) {
          modal.remove();
          $('body').css('overflow', 'auto');
        }
      });

      $('body').keydown((event) => {
        if (event.which === 27) {
          modal.remove();
          $('body').css('overflow', 'auto');
        }
      });
    };

    return this;
  };
})(jQuery);

class Tooltip {
    constructor() {
      this.tooltipElements = document.querySelectorAll('[data-tooltip="true"]');
      this.tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', this.showTooltip.bind(this));
        el.addEventListener('mouseleave', this.hideTooltip.bind(this));
        el.addEventListener('focus', this.showTooltip.bind(this));
        el.addEventListener('blur', this.hideTooltip.bind(this));
        el.addEventListener('touchstart', this.showTooltip.bind(this));
        el.addEventListener('touchend', this.hideTooltip.bind(this));
      });
    }
  
    showTooltip(event) {
      const tooltipText = event.target.getAttribute('data-tooltip-text');
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.innerHTML = tooltipText;
  
      event.target.parentElement.appendChild(tooltip);
      
      this.positionTooltip(event.target, tooltip);
      event.target.tooltip = tooltip;
      setTimeout(() => tooltip.classList.add('show'), 10);
    }
  
    hideTooltip(event) {
      const tooltip = event.target.tooltip;
      if (tooltip) {
        tooltip.classList.remove('show');
        setTimeout(() => event.target.parentElement.removeChild(tooltip), 200);
        event.target.tooltip = null;
      }
    }
  
    positionTooltip(element, tooltip) {
      const rect = element.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const containerRect = element.parentElement.getBoundingClientRect();
  
      let top = rect.top - containerRect.top - tooltipRect.height - 10;
      let left = rect.left - containerRect.left + (rect.width / 2) - (tooltipRect.width / 2);
  
      if (top < 0) {
        top = rect.bottom - containerRect.top + 10;
      } else if (top + containerRect.top < 0) {
        top = rect.bottom - containerRect.top + 10;
      }
  
      if (left < 0) {
        left = 5;
      }
      if (left + tooltipRect.width > containerRect.width) {
        left = containerRect.width - tooltipRect.width - 5;
      }
  
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      tooltip.style.position = 'absolute';
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new Tooltip();
  });
  
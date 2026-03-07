(function (window) {
  'use strict';

  function initEchartsGraphPage(config) {
    var dom = document.getElementById(config.containerId || 'container');
    if (!dom) return;

    var chart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    chart.showLoading();

    $.getJSON(config.dataPath, function (payload) {
      chart.hideLoading();

      var option = config.buildOption(payload);
      chart.setOption(option, true);
    });

    window.addEventListener('resize', function () {
      chart.resize();
    });
  }

  window.initEchartsGraphPage = initEchartsGraphPage;
})(window);

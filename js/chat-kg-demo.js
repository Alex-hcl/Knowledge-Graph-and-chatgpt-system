(function (window) {
  'use strict';

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function appendMessage(chatEl, role, content) {
    if (!chatEl) return;
    var roleText = role === 'user' ? 'You' : 'ChatGPT';
    chatEl.insertAdjacentHTML(
      'beforeend',
      '<p><strong>' + roleText + ':</strong> ' + escapeHtml(content) + '</p>'
    );
    chatEl.scrollTop = chatEl.scrollHeight;
  }

  function initChatKnowledgeGraphDemo(config) {
    var userInput = document.querySelector(config.selectors.userInput);
    var sendBtn = document.querySelector(config.selectors.sendButton);
    var chatEl = document.querySelector(config.selectors.chat);
    var graphPanel = document.querySelector(config.selectors.graphPanel);
    var chartContainer = document.querySelector(config.selectors.chartContainer);

    if (!userInput || !sendBtn || !chatEl || !chartContainer) {
      return;
    }

    var chart = echarts.init(chartContainer);
    var hasRendered = false;

    function renderGraph() {
      if (hasRendered) return;
      hasRendered = true;

      chart.setOption({
        series: [
          {
            type: 'graph',
            layout: 'force',
            data: config.graphData.nodes,
            links: config.graphData.links,
            force: {
              repulsion: config.repulsion || 300
            },
            itemStyle: {
              borderWidth: 1,
              borderColor: '#fff'
            },
            emphasis: {
              label: {
                show: true
              }
            },
            draggable: true,
            roam: true,
            label: {
              show: !!config.showLabels,
              formatter: '{b}'
            }
          }
        ]
      });

      chart.on('click', function (params) {
        if (params.dataType !== 'node') return;

        if (config.nodeClickMode === 'definition' && params.data.definition) {
          appendMessage(chatEl, 'assistant', params.data.definition);
          return;
        }

        appendMessage(chatEl, 'assistant', 'Selected node: ' + params.data.name);
      });
    }

    function onSend() {
      var text = userInput.value.trim();
      if (!text) return;

      appendMessage(chatEl, 'user', text);
      appendMessage(chatEl, 'assistant', config.assistantResponse);
      userInput.value = '';

      if (graphPanel) {
        graphPanel.style.display = 'block';
      }

      renderGraph();
      chart.resize();
    }

    sendBtn.addEventListener('click', onSend);
    userInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        onSend();
      }
    });

    window.addEventListener('resize', function () {
      chart.resize();
    });

    if (config.renderImmediately) {
      renderGraph();
    }
  }

  window.initChatKnowledgeGraphDemo = initChatKnowledgeGraphDemo;
})(window);

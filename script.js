// ---------------------------------------------------------------
// Decision tree. Each node is either:
//   a question:  { question, options: [{ label, next }] }
//   a result:    { title, escalate, steps: [] }
// To add a new problem, add nodes here and link them from "start".
// ---------------------------------------------------------------
const tree = {
  start: {
    question: 'What is the problem?',
    options: [
      { label: 'A screen or display shows nothing', next: 'screen_power' },
      { label: 'No internet connection', next: 'net_others' },
      { label: 'A computer will not start', next: 'pc_signs' },
      { label: 'A device is very slow', next: 'slow_storage' },
    ],
  },

  // ----- Screen / display -----
  screen_power: {
    question: 'Is the screen\u2019s power light on?',
    options: [
      { label: 'Yes, the light is on', next: 'screen_cable' },
      { label: 'No light at all', next: 'fix_screen_power' },
    ],
  },
  screen_cable: {
    question: 'Is the display cable (HDMI / DisplayPort) firmly connected at both ends?',
    options: [
      { label: 'Yes, both ends are secure', next: 'screen_signal' },
      { label: 'No, or I am not sure', next: 'fix_screen_cable' },
    ],
  },
  screen_signal: {
    question: 'Does the screen show a "No Signal" message?',
    options: [
      { label: 'Yes, "No Signal"', next: 'fix_no_signal' },
      { label: 'No, it is just black or blank', next: 'esc_screen' },
    ],
  },
  fix_screen_power: {
    title: 'Check the screen power supply',
    escalate: false,
    steps: [
      'Check the power cable is plugged in at the screen and at the wall.',
      'Try a different wall socket or a different power cable.',
      'Press and hold the screen power button for 5 seconds, then release.',
      'If there is still no light, the unit may be faulty. Log the ticket and escalate.',
    ],
  },
  fix_screen_cable: {
    title: 'Reseat the display cable',
    escalate: false,
    steps: [
      'Unplug the cable from both the screen and the source device.',
      'Plug it back in firmly at both ends.',
      'Select the correct input source on the screen (e.g. HDMI 1).',
      'If it still fails, try a different cable.',
    ],
  },
  fix_no_signal: {
    title: 'Restore the signal',
    escalate: false,
    steps: [
      'Use the screen menu to select the correct input source.',
      'Restart the media player or computer connected to the screen.',
      'Try the cable and input on another working screen to find the faulty part.',
      'If the source device will not start, follow the "computer will not start" guide.',
    ],
  },
  esc_screen: {
    title: 'Escalate: possible player or content issue',
    escalate: true,
    steps: [
      'Screen has power and a signal, but nothing is displayed.',
      'Restart the connected player or computer once and wait 3 minutes.',
      'If still blank, log the ticket with the site name and what was tried.',
      'Escalate to 2nd level support for remote checks.',
    ],
  },

  // ----- Internet -----
  net_others: {
    question: 'Do other devices connect to the same network?',
    options: [
      { label: 'Yes, others work fine', next: 'net_wifi' },
      { label: 'No, nothing connects', next: 'net_router' },
    ],
  },
  net_wifi: {
    question: 'Is Wi-Fi turned on and is the network visible on this device?',
    options: [
      { label: 'Wi-Fi is on and I can see the network', next: 'fix_forget_network' },
      { label: 'Wi-Fi is off or the network is missing', next: 'fix_enable_wifi' },
    ],
  },
  net_router: {
    question: 'Are the router lights on and showing normal activity?',
    options: [
      { label: 'Yes, lights look normal', next: 'esc_isp' },
      { label: 'No lights or red / warning lights', next: 'fix_router_power' },
    ],
  },
  fix_forget_network: {
    title: 'Reconnect this device',
    escalate: false,
    steps: [
      'Turn Wi-Fi off and on again.',
      'Forget the network, then reconnect and enter the password again.',
      'Restart the device.',
      'If it still fails, log the ticket and escalate.',
    ],
  },
  fix_enable_wifi: {
    title: 'Switch Wi-Fi back on',
    escalate: false,
    steps: [
      'Make sure Airplane mode is off.',
      'Turn Wi-Fi on in the device settings.',
      'Move closer to the router and check the network appears.',
      'If the network is still missing, restart the router.',
    ],
  },
  fix_router_power: {
    title: 'Restart the router',
    escalate: false,
    steps: [
      'Check the router power cable and wall socket.',
      'Switch the router off, wait 30 seconds, then switch it on.',
      'Wait 2 to 3 minutes for the lights to settle.',
      'If lights stay off or red, escalate as a possible hardware fault.',
    ],
  },
  esc_isp: {
    title: 'Escalate: possible provider outage',
    escalate: true,
    steps: [
      'Router looks normal but no device can reach the internet.',
      'Restart the router once and wait 3 minutes.',
      'Check the internet provider\u2019s status page or support line for an outage.',
      'Log the ticket with the provider reference number and escalate.',
    ],
  },

  // ----- Computer will not start -----
  pc_signs: {
    question: 'When you press the power button, do you see any lights or hear fans?',
    options: [
      { label: 'Yes, lights or fans come on', next: 'pc_screen' },
      { label: 'No, nothing happens', next: 'fix_pc_power' },
    ],
  },
  pc_screen: {
    question: 'Is there anything on the monitor, even an error message?',
    options: [
      { label: 'Yes, I see an error or logo', next: 'esc_pc_boot' },
      { label: 'No, the monitor is blank', next: 'fix_pc_monitor' },
    ],
  },
  fix_pc_power: {
    title: 'Check the computer power',
    escalate: false,
    steps: [
      'Check the power cable and plug at both ends.',
      'Try a different wall socket or power cable.',
      'For laptops, connect the charger and wait 10 minutes before trying again.',
      'If there is still no sign of power, escalate as a hardware fault.',
    ],
  },
  fix_pc_monitor: {
    title: 'Check the monitor connection',
    escalate: false,
    steps: [
      'Check the monitor is on and set to the correct input.',
      'Reseat the display cable at both ends.',
      'Try a different cable or monitor if available.',
      'If the computer still shows nothing, escalate.',
    ],
  },
  esc_pc_boot: {
    title: 'Escalate: start-up error',
    escalate: true,
    steps: [
      'Write down the exact error message or take a photo.',
      'Do not repeatedly force the computer off and on.',
      'Log the ticket with the error message and what was tried.',
      'Escalate to 2nd level support.',
    ],
  },

  // ----- Slow device -----
  slow_storage: {
    question: 'Does the device have many programs open or very little storage left?',
    options: [
      { label: 'Yes, probably', next: 'fix_slow' },
      { label: 'No, it has plenty of space and few programs', next: 'esc_slow' },
    ],
  },
  fix_slow: {
    title: 'Free up resources',
    escalate: false,
    steps: [
      'Close programs and browser tabs that are not needed.',
      'Restart the device.',
      'Delete unused files and empty the recycle bin.',
      'Install pending updates, then restart again.',
    ],
  },
  esc_slow: {
    title: 'Escalate: needs deeper checks',
    escalate: true,
    steps: [
      'Restart the device once to rule out a temporary fault.',
      'Note when the slowness started and which programs are affected.',
      'Log the ticket with these details.',
      'Escalate for checks such as malware, disk health or hardware.',
    ],
  },
};

// ---------------------------------------------------------------
// App logic
// ---------------------------------------------------------------
const content = document.getElementById('content');
const progress = document.getElementById('progress');
const backBtn = document.getElementById('backBtn');
const restartBtn = document.getElementById('restartBtn');

let current = 'start';
let history = []; // [{ nodeId, answer }]

function render() {
  const node = tree[current];
  content.innerHTML = '';

  renderProgress();
  backBtn.disabled = history.length === 0;

  if (node.question) {
    const h2 = document.createElement('h2');
    h2.className = 'question';
    h2.textContent = node.question;

    const list = document.createElement('div');
    list.className = 'options';

    node.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => {
        history.push({ nodeId: current, answer: opt.label });
        current = opt.next;
        render();
      });
      list.appendChild(btn);
    });

    content.append(h2, list);
    return;
  }

  renderResult(node);
}

function renderProgress() {
  progress.innerHTML = '';
  const total = history.length + 1;
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    if (i === total - 1) dot.className = 'current';
    progress.appendChild(dot);
  }
}

function renderResult(node) {
  const wrap = document.createElement('div');
  wrap.className = 'result';

  const tag = document.createElement('span');
  tag.className = 'tag ' + (node.escalate ? 'escalate' : 'fix');
  tag.textContent = node.escalate ? 'Escalate' : 'Try this fix';

  const h2 = document.createElement('h2');
  h2.textContent = node.title;

  const ol = document.createElement('ol');
  node.steps.forEach((s) => {
    const li = document.createElement('li');
    li.textContent = s;
    ol.appendChild(li);
  });

  const summary = document.createElement('pre');
  summary.className = 'summary';
  summary.textContent = buildSummary(node);

  const copy = document.createElement('button');
  copy.className = 'btn primary';
  copy.textContent = 'Copy incident summary';
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(summary.textContent);
      copy.textContent = 'Copied!';
    } catch {
      copy.textContent = 'Copy failed - select the text instead';
    }
    setTimeout(() => (copy.textContent = 'Copy incident summary'), 2000);
  });

  wrap.append(tag, h2, ol, summary, copy);
  content.appendChild(wrap);
}

// Turns the user's path into text they can paste into a ticket.
function buildSummary(node) {
  const lines = ['INCIDENT SUMMARY', ''];
  history.forEach((h) => {
    lines.push('Q: ' + tree[h.nodeId].question);
    lines.push('A: ' + h.answer);
  });
  lines.push('');
  lines.push('Outcome: ' + node.title);
  lines.push('Escalation needed: ' + (node.escalate ? 'Yes' : 'No'));
  return lines.join('\n');
}

backBtn.addEventListener('click', () => {
  const last = history.pop();
  if (last) {
    current = last.nodeId;
    render();
  }
});

restartBtn.addEventListener('click', () => {
  history = [];
  current = 'start';
  render();
});

render();

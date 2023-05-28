export const BASIC_DOUGHNUT_CHART_OPTIONS = {
  tooltips: { enabled: true },
  cutoutPercentage: 70,
  legend: { display: false },
  responsive: true,
  maintainAspectRatio: false
};

export const WIN_LOSE_CHART_LABELS = ['Przegrane mecze', 'Wygrane mecze'];

export const WIN_LOSE_RADAR_CHART_COLORS = [
  {
    backgroundColor: 'rgba(255,61,113,0.25)',
    borderColor: 'rgba(255,61,113,0.7)',
    pointBackgroundColor: '#FF3D71',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255,61,113)'
  },
  {
    backgroundColor: 'rgba(0,214,143,0.25)',
    borderColor: 'rgba(0,214,143,0.7)',
    pointBackgroundColor: '#00D68F',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(0,214,143)'
  }
];

export const LOSE_WIN_BAR_CHART_COLORS = [
  {
    backgroundColor: 'rgba(255,61,113,0.7)',
    borderColor: 'rgba(255,61,113)',
    pointBackgroundColor: '#FF3D71',
  },
  {
    backgroundColor: 'rgba(0,214,143,0.7)',
    borderColor: 'rgba(0,214,143)',
    pointBorderColor: '#fff',
  }
];

export const WIN_LOSE_BAR_CHART_COLORS = [
  {
    backgroundColor: 'rgba(0,214,143,0.7)',
    borderColor: 'rgba(0,214,143)',
    pointBorderColor: '#fff',
  },
  {
    backgroundColor: 'rgba(255,61,113,0.7)',
    borderColor: 'rgba(255,61,113)',
    pointBackgroundColor: '#FF3D71',
  }
];

export const WIN_LOSE_DOUGHNUT_CHART_COLORS = [
  {
    borderColor: ['#FF3D71', '#00D68F'],
    backgroundColor: ['rgba(255,61,113,0.7)', 'rgba(0,214,143,0.7)']
  }
];

export const NO_TOOLTIP_DOUGHNUT_CHART_OPTIONS = {
  tooltips: { enabled: false },
  cutoutPercentage: 70,
  legend: { display: false },
  responsive: true,
  maintainAspectRatio: false
};
export const NO_MATCHES_DOUGHNUT_CHART_LABELS = ['Brak rozegranych meczy'];

export const NO_MATCHES_DOUGHNUT_CHART_COLORS = [
  {
    borderColor: ['#4e535c'],
    backgroundColor: ['#8c94a5']
  }
];
export const NO_MATCHES_DOUGHNUT_CHART_DATA = [1];

export const MATCH_SUMMARY_STATS_RADAR_CHART_OPTIONS = { responsive: true };

export const MATCH_SUMMARY_STATS_CHART_LABEL = ['Zbiórki w ataku', 'Zbiórki w obronie', 'Asysty', 'Bloki', 'Przechwyty', 'Trafienia 2-PT', 'Trafienia 3-PT', 'Trafione rzuty wolne'];


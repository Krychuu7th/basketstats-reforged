export class ChartProperty {

  public static basicDoughnutChartOptions = {
    tooltips: { enabled: true },
    cutoutPercentage: 70,
    legend: { display: false },
    responsive: true,
    maintainAspectRatio: false
  };

  public static winLoseChartLabels = ['Przegrane mecze', 'Wygrane mecze']
  public static winLoseRadarChartColors = [
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

  public static loseWinBarChartColors = [
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

  public static winLoseBarChartColors = [
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

  public static winLoseDoughnutChartColors = [
    {
      borderColor: ['#FF3D71', '#00D68F'],
      backgroundColor: ['rgba(255,61,113,0.7)', 'rgba(0,214,143,0.7)']
    }
  ];

  public static noTooltipDoughnutChartOptions = {
    tooltips: { enabled: false },
    cutoutPercentage: 70,
    legend: { display: false },
    responsive: true,
    maintainAspectRatio: false
  };
  public static noMatchesDoughnutChartLabels = ['Brak rozegranych meczy'];
  public static noMatchesDoughnutChartColors = [
    {
      borderColor: ['#4e535c'],
      backgroundColor: ['#8c94a5']
    }
  ];
  public static noMatchesDoughnutChartData = [1];

  public static matchSummaryStatsRadarChartOptions = { responsive: true };

  public static matchSummaryStatsChartLabel= ['Zbiórki w ataku', 'Zbiórki w obronie', 'Asysty', 'Bloki', 'Przechwyty', 'Trafienia 2-PT', 'Trafienia 3-PT', 'Trafione rzuty wolne'];
}

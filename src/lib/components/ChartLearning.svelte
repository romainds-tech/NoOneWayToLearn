<script lang="ts">
    import { Chart, Card} from 'flowbite-svelte';

    export let serie: [] = [];


    let options = {
        series: serie,
        colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694'],
        chart: {
            height: 320,
            width: '100%',
            type: 'donut'
        },
        stroke: {
            colors: ['transparent'],
            lineCap: ''
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontFamily: 'Inter, sans-serif',
                            offsetY: 20
                        },
                        total: {
                            showAlways: true,
                            show: true,
                            label: 'Apprentissage informel',
                            fontFamily: 'Inter, sans-serif',
                            formatter: function (w) {
                                const values = Math.max(...w.globals.seriesTotals).toFixed(2);
                                return `${values} %`;
                            }
                        },
                        value: {
                            show: true,
                            fontFamily: 'Inter, sans-serif',
                            offsetY: -20,
                            formatter: function (value) {
                                return value + 'k';
                            }
                        }
                    },
                    size: '80%'
                }
            }
        },
        grid: {
            padding: {
                top: -2
            }
        },
        labels: ['Expérience pro', 'Side Project', 'Open Source', 'Mentorat'],
        dataLabels: {
            enabled: false
        },
        legend: {
            position: 'bottom',
            fontFamily: 'Inter, sans-serif'
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + 'k';
                }
            }
        },
        xaxis: {
            labels: {
                formatter: function (value) {
                    return value + 'k';
                }
            },
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            }
        }
    };

    $: options.series = serie;



</script>

<Card>
    <div class="flex justify-between items-start w-full">
        <div class="flex-col items-center">
            <div class="flex items-center mb-1">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Apprentissage informel</h5>
            </div>
        </div>
    </div>

    <Chart {options} class="py-6" />

</Card>
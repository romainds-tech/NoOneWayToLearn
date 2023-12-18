<script lang="ts">
    import { Chart, Card} from 'flowbite-svelte';

    export let serie: [] = [];

    let label = ""

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
                            label: "",
                            fontFamily: 'Inter, sans-serif',
                            formatter: function (w) {
                                const values = Math.max(...w.globals.seriesTotals).toFixed(2);
                                let index = w.globals.seriesTotals.indexOf(Math.max(...w.globals.seriesTotals));
                                label = w.globals.labels[index]
                                return `${values} %`;
                            }
                        },
                        value: {
                            show: true,
                            fontFamily: 'Inter, sans-serif',
                            offsetY: -20,
                            formatter: function (value) {
                                return parseFloat(value).toFixed(2) + '%';
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
                    return parseFloat(value).toFixed(2) + '%';
                }
            }
        },
        xaxis: {
            labels: {
                formatter: function (value) {
                    return parseFloat(value).toFixed(2) + '%';
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
    $: options.plotOptions.pie.donut.labels.total.label = label;


</script>

<Card class="mt-10 rounded-3xl m-5 h-fit">
    <div class="flex justify-between items-start w-full">
        <div class="flex-col items-center">
            <div class="flex items-center mb-1">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Apprentissage informel optimal</h5>
            </div>
        </div>
    </div>

    <Chart {options} class="py-6" />

</Card>
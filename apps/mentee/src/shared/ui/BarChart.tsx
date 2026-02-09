import * as d3 from "d3"
import { useEffect, useRef } from "react"

export interface IBarSeries {
    key: string
    label: string
}

interface IBarChartProps<T> {
    width?: number
    height?: number
    data: T[]
    xKey: keyof T
    series: IBarSeries[]
}

/**
 * @description 바 차트 컴포넌트
 */
const BarChart = <T extends object>({
    width = 500,
    height = 300,
    data,
    xKey,
    series,
}: IBarChartProps<T>) => {
    const svgRef = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        if (!svgRef.current || data.length === 0) return

        const svg = d3.select(svgRef.current)
        svg.selectAll("*").remove()

        const subjectGradients: Record<string, [string, string]> = {
            국어: ['rgba(212, 241, 254, 0.8)', 'rgba(243, 243, 243, 0.8)'],
            영어: ['rgba(215, 193, 242, 0.8)', 'rgba(243, 243, 243, 0.8)'],
            수학: ['rgba(255, 245, 157, 0.8)', 'rgba(243, 243, 243, 0.8)'],
        }
        const defs = svg.append("defs")

        /** 인셋 섀도우 필터 (box-shadow: 0px 0px 8px 1px #0000001A inset 근사) */
        const insetFilter = defs.append("filter").attr("id", "inset-shadow").attr("x", "-10%").attr("y", "-10%").attr("width", "120%").attr("height", "120%")
        insetFilter.append("feGaussianBlur").attr("in", "SourceAlpha").attr("stdDeviation", "2").attr("result", "blur")
        insetFilter.append("feFlood").attr("flood-color", "#000").attr("flood-opacity", "0.1").attr("result", "color")
        insetFilter.append("feComposite").attr("in", "color").attr("in2", "blur").attr("operator", "in").attr("result", "shadow")
        insetFilter.append("feComposite").attr("in", "SourceGraphic").attr("in2", "shadow").attr("operator", "over")

        Object.entries(subjectGradients).forEach(([name, [from, to]]) => {
            const grad = defs.append("linearGradient")
                .attr("id", `gradient-${name}`)
                .attr("x1", "0%").attr("y1", "0%").attr("x2", "0%").attr("y2", "100%")
            grad.append("stop").attr("offset", "0%").attr("stop-color", from)
            grad.append("stop").attr("offset", "100%").attr("stop-color", to)
        })

        const defaultFill = "#94a3b8"

        const margin = { top: 40, right: 24, bottom: 48, left: 48 }
        const innerWidth = width - margin.left - margin.right
        const innerHeight = height - margin.top - margin.bottom

        const x0 = d3
            .scaleBand()
            .domain(data.map((d) => String(d[xKey])))
            .range([0, innerWidth])
            .paddingInner(0.2)

        const activeSeries = series
        if (activeSeries.length === 0) {
            svg
                .attr("viewBox", `0 0 ${width} ${height}`)
                .append("text")
                .attr("x", width / 2)
                .attr("y", height / 2)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .style("fill", "#94a3b8")
                .text("표시할 항목이 없습니다.")
            return
        }

        const x1 = d3
            .scaleBand()
            .domain(activeSeries.map((s) => s.key))
            .range([0, x0.bandwidth()])
            .padding(0.1)

        const totalSum = data.reduce(
            (sum, d) =>
                sum +
                activeSeries.reduce(
                    (acc, s) => acc + Number((d as Record<string, unknown>)[s.key] ?? 0),
                    0,
                ),
            0,
        )
        /** 막대 높이 기준: 100% = 최대 높이 */
        const y = d3
            .scaleLinear()
            .domain([0, 100])
            .nice()
            .range([innerHeight, 0])

        const container = svg
            .attr("viewBox", `0 0 ${width} ${height}`)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`)

        const xAxis = d3
            .axisBottom(x0)
            .tickFormat((value: unknown) => String(value))
            .tickSize(0)

        const xAxisG = container
            .append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(xAxis)
        xAxisG.select(".domain").remove()
        xAxisG.selectAll(".tick line").remove()
        xAxisG.selectAll("text")
            .style("font-size", "14px")
            .style("text-anchor", "middle")

        const yAxis = d3.axisLeft(y).ticks(6).tickSize(0)
        const yAxisG = container.append("g").call(yAxis)
        yAxisG.select(".domain").remove()
        yAxisG.selectAll(".tick line").remove()
        yAxisG.selectAll("text").remove()

        const groups = container
            .append("g")
            .selectAll("g")
            .data(data as unknown[])
            .enter()
            .append("g")
            .attr(
                "transform",
                (d: unknown) => `translate(${x0(String((d as T)[xKey])) ?? 0},0)`,
            )

        const rectData = (d: unknown) => {
            const row = d as Record<string, unknown>
            const category = String(row[xKey as string] ?? '')
            return activeSeries.map((s) => ({
                seriesKey: s.key,
                value: Number(row[s.key] ?? 0),
                category,
            }))
        }

        type RectDatum = { seriesKey: string; value: number; category: string }

        /** 게이지: 전체 높이 = 흰색 트랙(인셋 섀도우) + 데이터 높이만 그라데이션 */
        const barGroups = groups
            .selectAll("g.bar")
            .data(rectData)
            .enter()
            .append("g")
            .attr("class", "bar")

        barGroups.each((d: unknown, i: number, nodes: SVGGElement[]) => {
            const datum = d as RectDatum
            const g = d3.select(nodes[i])
            const barX = x1(datum.seriesKey) ?? 0
            const barW = x1.bandwidth()
            const pct = totalSum > 0 ? (datum.value / totalSum) * 100 : 0
            const valueY = y(pct)
            const valueHeight = innerHeight - valueY
            const fillColor = subjectGradients[datum.category] ? `url(#gradient-${datum.category})` : defaultFill

            const rx = Math.min(50, barW / 2)
            const ry = Math.min(40, valueHeight / 2)
            const trackRx = Math.min(50, barW / 2)
            const trackRy = Math.min(40, innerHeight / 2)

            const trackPath = `M ${barX} ${innerHeight - trackRy} Q ${barX} ${innerHeight} ${barX + trackRx} ${innerHeight} L ${barX + barW - trackRx} ${innerHeight} Q ${barX + barW} ${innerHeight} ${barX + barW} ${innerHeight - trackRy} L ${barX + barW} ${trackRy} Q ${barX + barW} 0 ${barX + barW - trackRx} 0 L ${barX + trackRx} 0 Q ${barX} 0 ${barX} ${trackRy} Z`
            const isFull = valueHeight >= innerHeight - 0.5
            if (!isFull) {
                g.append("path")
                    .attr("d", trackPath)
                    .attr("fill", "#ffffff")
                    .attr("filter", "url(#inset-shadow)")
            }
            const bottomRy = Math.min(ry, valueHeight / 2)
            const pillPath =
                valueHeight <= 0
                    ? ''
                    : isFull
                        ? trackPath
                        : `M ${barX} ${innerHeight - bottomRy} Q ${barX} ${innerHeight} ${barX + rx} ${innerHeight} L ${barX + barW - rx} ${innerHeight} Q ${barX + barW} ${innerHeight} ${barX + barW} ${innerHeight - bottomRy} L ${barX + barW} ${valueY + ry} Q ${barX + barW} ${valueY} ${barX + barW - rx} ${valueY} L ${barX + rx} ${valueY} Q ${barX} ${valueY} ${barX} ${valueY + ry} Z`
            g.append("path")
                .attr("d", pillPath)
                .attr("fill", fillColor)

            const pctLabel = totalSum > 0 ? Math.round((datum.value / totalSum) * 100) : 0
            g.append("text")
                .attr("x", barX + barW / 2)
                .attr("y", innerHeight - 8)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .style("fill", "#64748b")
                .text(`${pctLabel}%`)
        })
    }, [data, height, series, width, xKey])
    return (
        <div className="bg-transparent p-4">
            <svg ref={svgRef} />
        </div>
    )
}

export default BarChart

"use client"

import { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'

interface TradingViewWidgetProps {
  symbol: string
}

export default function TradingViewWidget({ symbol }: TradingViewWidgetProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<any>(null)

  useEffect(() => {
    if (chartContainerRef.current) {
      // Clear existing chart if there is one
      if (chartRef.current) {
        chartRef.current.remove()
      }

      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: 'solid', color: 'transparent' },
          textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
          vertLines: {
            color: 'rgba(197, 203, 206, 0.1)',
          },
          horzLines: {
            color: 'rgba(197, 203, 206, 0.1)',
          },
        },
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight - 30,
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      })

      chartRef.current = chart

      // Generate sample data for the chart
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      })

      // Generate sample data
      const data = generateDummyData(symbol)
      candlestickSeries.setData(data)

      // Add a volume series
      const volumeSeries = chart.addHistogramSeries({
        color: '#26a69a',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      })

      const volumeData = data.map(item => ({
        time: item.time,
        value: item.volume || Math.random() * 200,
        color: (item.close || 0) >= (item.open || 0) ? 'rgba(38, 166, 154, 0.5)' : 'rgba(239, 83, 80, 0.5)'
      }))

      volumeSeries.setData(volumeData)

      // Handle resize
      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
          chart.applyOptions({
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight - 30,
          })
        }
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        if (chartRef.current) {
          chartRef.current.remove()
        }
      }
    }
  }, [symbol])

  return (
    <div ref={chartContainerRef} className="w-full h-full" />
  )
}

function generateDummyData(symbol: string) {
  const now = new Date()
  const numberOfDays = 60
  const data = []

  let price = symbol.includes('BTC') ? 30000 : symbol.includes('ETH') ? 2000 : 1

  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - (numberOfDays - i))

    const volatility = (Math.random() * 2 - 1) * 0.01
    const changePercent = 0.005 + Math.random() * 0.01 + volatility

    const open = price
    const close = price * (1 + (Math.random() > 0.5 ? 1 : -1) * changePercent)
    const high = Math.max(open, close) * (1 + Math.random() * 0.005)
    const low = Math.min(open, close) * (1 - Math.random() * 0.005)
    const volume = Math.floor(Math.random() * 1000) + 500

    data.push({
      time: Math.floor(date.getTime() / 1000),
      open,
      high,
      low,
      close,
      volume
    })

    price = close // Next day's open is today's close
  }

  return data
}

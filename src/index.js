import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import styles from './styles.css'

export default class SeatMap extends React.Component {
  static propTypes = {
    sections: PropTypes.array,
    seats: PropTypes.array,
    seatClick: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.svgRef = React.createRef()
  }

  drawSections(container, data) {
    const sections = container.append('g')
    sections.selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('fill', '#F2F2F2')
      .attr('d', (d) => d.path)
      .attr('transform', (d) => d.transform)
  }

  drawSeats(container, data, clickHandler) {
    container.append('g')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('fill', '#5499C7')
      .attr('r', 1)
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .on('click', (d) => clickHandler(d))
  }

  drawSvg() {
    const selection = d3.select(this.svgRef.current)
    const parent = selection._groups[0][0]

    const width = parent.clientWidth
    const height = parent.clientHeight
    const xOffset = (640 - width) / 2
    const yOffset = (480 - height) / 2
    const defaultZoom = Math.min(width / 640, height / 480)

    const params = {
      minX: xOffset,
      minY: yOffset,
      scale: [0.5, 20]
    }

    const zoom = d3.zoom().scaleExtent(params.scale)

    const svg = selection
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', params.minX + ' ' + params.minY + ' ' + width + ' ' + height)
      .attr('preserveAspectRatio', 'xMinYMin')
      .call(zoom)
      .on('dblclick.zoom', null)

    svg.select('g').remove()
    const container = svg.append('g')
    zoom.on('zoom', function () {
      container.attr('transform', d3.event.transform)
    })

    this.drawSections(container, this.props.sections)
    this.drawSeats(container, this.props.seats, this.props.seatClick)
    zoom.scaleBy(svg, defaultZoom)
  }

  componentDidUpdate() {
    this.drawSvg()
  }

  render() {
    return (
      <div className={styles.mapContainer}>
        <svg className={styles.map} ref={this.svgRef} />
      </div>
    )
  }
}

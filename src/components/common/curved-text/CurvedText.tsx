import {ReactNode, useState} from 'react'
import styles from './CurvedText.module.scss'
import clsx from 'clsx'
import {useInterval} from 'usehooks-ts'

interface CurvedTextProps {
  text: ReactNode
  textFontSize: number
  textFontWeight?: number
  radius: number
  speed?: number
  size: number
  symbol: ReactNode
  className?: string
}

const CurvedText = ({
  text,
  textFontSize,
  textFontWeight = 400,
  radius,
  speed = 1,
  size = 90,
  symbol = null,
  className
}: CurvedTextProps) => {
  const [shift, setShift] = useState(0)

  useInterval(() => {
    const delta = 0.001 * speed

    setShift((prev) => (prev + delta >= 1 ? 0 : prev + delta))
  }, 1)

  return (
    <div
      className={clsx(styles.wrapper, className)}
      style={{
        width: size + 'px',
        height: size + 'px',
        borderRadius: size
      }}
    >
      <div
        className={styles.text}
        style={{
          transform: `rotate(${360 * shift}deg)`
        }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            id='curve'
            d={`M ${size / 2} ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${
              radius * 2
            },0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            fill='transparent'
          />
          <text fontSize={textFontSize} fontWeight={textFontWeight} fill='#000000'>
            <textPath xlinkHref='#curve' textLength={2 * Math.PI * radius}>
              {text}
            </textPath>
          </text>
        </svg>
      </div>

      {symbol ? <div className={styles.symbol}>{symbol}</div> : null}
    </div>
  )
}

export default CurvedText

import clsx from 'clsx'
import styles from './NewsPagination.module.scss'
import {ReactComponent as ArrowSVG} from '../../../icons/slider-arrow.svg'
import useMedia from '../../utils/useMedia'

// TODO: use to determine dots count
// interface newsPagination {
//     newsTotal: number
//     maxPoints: number
// }

const totalCircles = 6

const NewsPagination = () => {
  const {isDesktop} = useMedia()

  return (
    <div className={styles.dots}>
      {isDesktop && (
        <div className={clsx(styles.arrowLeft, styles.arrowDisabled)}>
          <ArrowSVG />
        </div>
      )}

      <ul className={styles.dotsMiddle}>
        <li className={clsx(styles.dot, styles.dotActive)}>1</li>
        {Array(totalCircles - 3)
          .fill(0)
          .map((_, index) => (
            <li key={index + 1} className={styles.dot}>
              {index + 2}
            </li>
          ))}
        <li className={styles.dot}>...</li>
        <li className={styles.dot}>999</li>
      </ul>

      {isDesktop && (
        <div className={styles.arrowRight}>
          <ArrowSVG />
        </div>
      )}
    </div>
  )
}

export default NewsPagination

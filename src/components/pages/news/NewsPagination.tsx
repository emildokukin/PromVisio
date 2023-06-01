import clsx from 'clsx'
import styles from './NewsPagination.module.scss'
import {ReactComponent as ArrowSvg} from '../../../icons/slider-arrow.svg'
import useMedia from '../../utils/useMedia'

// interface newsPagination {
//     newsTotal: number
//     maxPoints: number
// }

const totalCircles = 6

const NewsPagination = () => {
  const {isDesktop} = useMedia()

  return (
    <div className={styles.container}>
      {isDesktop && (
        <div className={clsx(styles.arrowLeft, styles.arrowDisabled)}>
          <ArrowSvg />
        </div>
      )}

      <ul className={styles.middleDotsContainer}>
        {[
          <div key={0} className={clsx(styles.dot, styles.activeDot)}>
            1
          </div>,
          Array(totalCircles - 3)
            .fill(0)
            .map((_, index) => (
              <div key={index + 1} className={styles.dot}>
                {index + 2}
              </div>
            )),
          <div key={123123} className={styles.dot}>
            ...
          </div>,
          <div key={321312} className={styles.dot}>
            999
          </div>
        ]}
      </ul>

      {isDesktop && (
        <div className={styles.arrowRight}>
          <ArrowSvg />
        </div>
      )}
    </div>
  )
}

export default NewsPagination

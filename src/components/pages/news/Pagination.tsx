import clsx from 'clsx'
import styles from './Pagination.module.scss'
import useMedia from '../../utils/useMedia'
import SliderButton from '../../common/slider/SliderButton'
import {useCallback, useState} from 'react'

interface PaginationProps {
  className?: string
  totalPages?: number | undefined
  onDotClick?: (page: number) => void
}

const Pagination = ({className, totalPages, onDotClick: onClick}: PaginationProps) => {
  const [page, setPage] = useState(1)
  const {isDesktop} = useMedia()

  const onDotClick = useCallback(
    (page: number) => {
      setPage(page)
      onClick?.(page)
    },
    [onClick]
  )

  return (totalPages || 0) > 1 ? (
    <div className={clsx(styles.dots, className)}>
      {isDesktop && (
        <SliderButton className={styles.arrowPrev} disabled={page === 1} onClick={() => onDotClick(page - 1)} />
      )}

      <ul className={styles.dotsMiddle}>
        {Array(totalPages)
          .fill(0)
          .map((_, index) => (
            <li
              className={clsx(styles.dot, {[styles.dotActive]: index + 1 === page})}
              onClick={() => onDotClick(index + 1)}
              key={index + 1}
            >
              {index + 1}
            </li>
          ))}
      </ul>

      {isDesktop && (
        <SliderButton
          className={styles.arrowNext}
          disabled={page === totalPages}
          onClick={() => onDotClick(page + 1)}
          next
        />
      )}
    </div>
  ) : null
}

export default Pagination

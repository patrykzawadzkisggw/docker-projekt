export const  timeAgo = (targetDate) => {
    const now = new Date()
    const target = new Date(targetDate)

    const diffInSeconds = Math.floor((now - target) / 1000)

    const years = Math.floor(diffInSeconds / (365.25 * 24 * 60 * 60))
    if (years >= 1) {
      return years === 1 ? '1 rok' : `${years} lat`
    }

    const months = Math.floor(diffInSeconds / (30 * 24 * 60 * 60))
    if (months >= 1) {
      return months === 1 ? '1 miesiąc' : `${months} miesięcy`
    }

    const days = Math.floor(diffInSeconds / (24 * 60 * 60))
    if (days >= 1) {
      return days === 1 ? '1 dzień' : `${days} dni`
    }

    const hours = Math.floor(diffInSeconds / (60 * 60))
    if (hours >= 1) {
      return hours === 1 ? '1 godzina' : `${hours} godzin`
    }

    const minutes = Math.floor(diffInSeconds / 60)
    if (minutes >= 1) {
      return minutes === 1 ? '1 minuta' : `${minutes} minut`
    }

    return diffInSeconds === 1 ? '1 sekunda' : `${diffInSeconds} sekund`
  }
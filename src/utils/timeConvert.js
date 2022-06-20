class Time {

    MinutesForHours(minutesTime) {
        const minutes = minutesTime%60
        const hours = Math.floor(minutesTime/60)

        return [hours,minutes]
    }
}

export default new Time()
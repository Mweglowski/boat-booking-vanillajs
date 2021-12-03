console.log("%cBoat Booking", "background: #1a5276; color: white; padding: 8px; font-size: 1rem; font-weight: bold; border-radius: 10px;")

const plus = document.getElementById('plus')
const tableBox = document.getElementById('table-box')
const creationPanel = document.getElementById('creation-panel')
const exitIcon = document.getElementById('exit-icon')
const firstNameInput = document.getElementById('first-name-input')
const lastNameInput = document.getElementById('last-name-input')
const boatNameInput = document.getElementById('boat-type-select-input')
const firstHourInput = document.getElementById('first-hour-input')
const secondHourInput = document.getElementById('second-hour-input')
const additionalInfo = document.getElementById('additional-info')
const submitBtn = document.getElementById('submit-btn')

const inputs = document.querySelectorAll('input')

let reservations = {}

const boats = Array.from(document.getElementById('boats').children).map(child => child.textContent)

let error = false

let indexOfReservation = 0

let $newColor = ''

// CREATING NEW TABLE
plus.addEventListener('click', () => {
    creationPanel.style.top = "10vh"
})

// EXITING CREATION PANEL
exitIcon.addEventListener('click', creationPanelCleaner)


// CREATE NEW TABLE
function createTable() {

}

// CREATE RESERVATION LIST IN SPECIFIC TABLE
function buildReservationListInTable(specificBoat, reservationListInTable, specificTable) {
    const reservationsOnSpecificBoat = reservations[specificBoat]

    for (let i = 0; i < reservationsOnSpecificBoat.length; i++) {
        
        const reservation = document.createElement('div')
        reservation.classList.add('reservation-in-table')
    
        const client = document.createElement('div')
        client.textContent = reservationsOnSpecificBoat[i].client
        client.classList.add('client-in-reservation-list-in-table')
        const clientIcon = document.createElement('i')
        clientIcon.classList.add('fas')
        clientIcon.classList.add('fa-user-circle')
        client.prepend(clientIcon)
        reservation.appendChild(client)
    
        const bookedHours = document.createElement('div')
        bookedHours.textContent = `${reservationsOnSpecificBoat[i].hours[0]}:00  -  ${reservationsOnSpecificBoat[i].hours[1]}:00`
        bookedHours.classList.add('bookedHours-in-reservation-list-in-table')
        const clockIcon = document.createElement('i')
        clockIcon.classList.add('fas')
        clockIcon.classList.add('fa-clock')
        bookedHours.prepend(clockIcon)
        reservation.appendChild(bookedHours)

        if (reservationsOnSpecificBoat[i].additionalInfo !== "") {
            const aditInfo = document.createElement('div')
            aditInfo.textContent = reservationsOnSpecificBoat[i].additionalInfo
            aditInfo.classList.add('additional-info-in-reservation-list-in-table')
            const infoIcon = document.createElement('i')
            infoIcon.classList.add('fas')
            infoIcon.classList.add('fa-info-circle')
            aditInfo.prepend(infoIcon)
            reservation.appendChild(aditInfo)
        }
    
        reservationListInTable.appendChild(reservation)

        const beforeAfterInReservationCSS = document.createElement('style')
        // style.setAttribute('id', `reservation-list-in-table-${specificBoat}-${i + 1}`)
        beforeAfterInReservationCSS.innerHTML = `
        div[id="reservation-list-in-table-${specificBoat}"] .reservation-in-table:nth-child(${i + 1})::after, 
        div[id="reservation-list-in-table-${specificBoat}"] .reservation-in-table:nth-child(${i + 1})::before {
            background-color: ${reservationsOnSpecificBoat[i].color}
        }`
        document.head.appendChild(beforeAfterInReservationCSS)
        console.log(specificBoat)
    }

    specificTable.append(reservationListInTable)
}

// CREATING NEW TABLE AND ADDING NEW RESERVATION
function addNewReservation() { 

    // $newColor = colors[Math.round(Math.random() * colors.length)]
    // colors = colors.filter(item => item !== $newColor)
    // console.log(colors)
    $newColor = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`

    if (Object.keys(reservations).includes(boatNameInput.value)) {

        reservations[boatNameInput.value].push({
            client: `${firstNameInput.value} ${lastNameInput.value}`,
            hours: [parseInt(firstHourInput.value), parseInt(secondHourInput.value)],
            additionalInfo: additionalInfo.value,
            color: $newColor
        })
        reservations[boatNameInput.value].sort((a, b) => {
            return a.hours[0] - b.hours[1]
        })

        if (document.getElementById(`angle-${boatNameInput.value}`).classList.contains('rotate')) {

            document.getElementById(`reservation-list-in-table-${boatNameInput.value}`).remove()

            const reservationListInTable = document.createElement('div')
            reservationListInTable.setAttribute('id', `reservation-list-in-table-${boatNameInput.value}`)
            reservationListInTable.classList.add('reservation-list-in-table')

            const specificBoat = boatNameInput.value
            const specificTable = document.getElementById(`table-${boatNameInput.value}`)

            // CREATING RESERVATION LIST IN TABLE WHEN TABLE IS "OPEN"
            buildReservationListInTable(specificBoat, reservationListInTable, specificTable)
        }

    } else {
        let table = document.createElement('div')
        table.classList.add('table')
        table.setAttribute('id', `table-${boatNameInput.value}`)
    
        let boatNameDiv = document.createElement('div')
        boatNameDiv.classList.add('boat-name-div')
        boatNameDiv.setAttribute('id', `boat-name-div-${boatNameInput.value}`)
        boatNameDiv.textContent = boatNameInput.value
    
        let angle = document.createElement('i')
        angle.classList.add('fas')
        angle.classList.add('fa-angle-down')
        angle.setAttribute('id', `angle-${boatNameInput.value}`)
        angle.addEventListener('click', () => {

            if (angle.classList.contains('rotate') === false) {
                angle.classList.add('rotate')
                
                const reservationListInTable = document.createElement('div')
                reservationListInTable.setAttribute('id', `reservation-list-in-table-${boatNameDiv.textContent}`)
                reservationListInTable.classList.add('reservation-list-in-table')

                const specificBoat = boatNameDiv.textContent
                const specificTable = document.getElementById(`table-${specificBoat}`)

                // CREATING RESERVATION LIST WHILE EXTENDING TABLE
                buildReservationListInTable(specificBoat, reservationListInTable, specificTable)

                // colorHours(document.getElementById(`hours-${boatNameDiv.textContent}`), true)
                const hoursDiv = document.getElementById(`hours-${boatNameDiv.textContent}`)

                Array.from(hoursDiv.children).forEach(hour => {
                    if (hour.classList.contains('active-hour')) {
                        hour.style.backgroundColor = hour.dataset.customColor
                    }
                })

            } else {
                angle.classList.remove('rotate')
                table.removeChild(table.lastChild)

                // colorHours(document.getElementById(`hours-${boatNameDiv.textContent}`), false)
                const hoursDiv = document.getElementById(`hours-${boatNameDiv.textContent}`)

                Array.from(hoursDiv.children).forEach(hour => {
                    if (hour.classList.contains('active-hour')) {
                        hour.style.backgroundColor = 'rgb(44, 137, 195)'
                    }
                })
            }
        })
    
        let hours = document.createElement('ul')
        hours.classList.add('hours')
        hours.setAttribute('id', `hours-${boatNameInput.value}`)
    
        for (let i = 9; i <= 21; i++) {
            if (i == 21) {
                let span = document.createElement('span')
                span.textContent = `${i}`
                span.classList.add('last-hour-span')
                hours.lastChild.append(span)
                break
            }
            let hour = document.createElement('li')
            hour.classList.add('hour')
            let span = document.createElement('span')
            span.textContent = `${i}`
            span.classList.add('hour-span')
            hour.append(span)
            hours.append(hour)
        }
    
        table.append(boatNameDiv)
        table.append(angle)
        table.append(hours)
        tableBox.append(table)

        reservations[boatNameInput.value] = [
            {
                client: `${firstNameInput.value} ${lastNameInput.value}`,
                hours: [parseInt(firstHourInput.value), parseInt(secondHourInput.value)],
                additionalInfo: additionalInfo.value,
                color: $newColor
            }    
        ]

        // colorHours(document.getElementById(`hours-${boatNameInput.value}`), false)
    }

    if (document.getElementById(`angle-${boatNameInput.value}`).classList.contains('rotate') === false) { // NOT EXPANDED
        console.log('not contains rotate')
        const hoursDiv = document.getElementById(`hours-${boatNameInput.value}`)

        Array.from(hoursDiv.children).forEach(hour => {

            const hourValue = parseInt(hour.firstChild.textContent)
    
            if ((hourValue >= parseInt(firstHourInput.value) && hourValue < parseInt(secondHourInput.value))) { 
            
                hour.classList.add('active-hour')
            
                hour.dataset.customColor = $newColor
                hour.style.backgroundColor = 'rgb(44, 137, 195)'
            }

        })
    } else {
        console.log('contains rotate lol')
        const hoursDiv = document.getElementById(`hours-${boatNameInput.value}`)

        Array.from(hoursDiv.children).forEach(hour => {

            const hourValue = parseInt(hour.firstChild.textContent)
    
            if ((hourValue >= parseInt(firstHourInput.value) && hourValue < parseInt(secondHourInput.value))) { 
            
                hour.classList.add('active-hour')
            
                hour.dataset.customColor = $newColor
                hour.style.backgroundColor = $newColor
            }

        })
    }
}

// CHECKS IF IT IS OPPORTUNITY TO BOOK IN SPECIFIC HOURS AND INSERTS HOURS IN CORRECT PLACE IN RESERVATION HOURS
function reservationFinder() {
    if (Object.keys(reservations).includes(boatNameInput.value)) {
        
        let bookHours = reservations[boatNameInput.value].map(reservation => {
            return reservation.hours
        })

        error = true

        if (bookHours.length == 1) {
            if (secondHourInput.value <= bookHours[0][0]) {
                error = false
                indexOfReservation = 0
            } else {
                secondHourInput.classList.add('red-border')
            }
            if (firstHourInput.value >= bookHours[0][1]) {
                error = false
                indexOfReservation = 1
            } else {
                firstHourInput.classList.add('red-border')
            }
        } else {
            for (let i = 0; i < bookHours.length; i++) {
                if (firstHourInput.value >= bookHours[bookHours.length - 1][1]) {
                    error = false
                    indexOfReservation = bookHours.length
                    break
                }
                if (i != 0) {
                    if (i == bookHours.length) {
                        if (firstHourInput.value >= bookHours[i - 1][1]) {
                            error = false
                            indexOfReservation = i
                            break
                        }
                    } else {
                        if (firstHourInput.value >= bookHours[i - 1][1] && secondHourInput.value <= bookHours[i][0] && 
                            !(bookHours[i - 1][0] > firstHourInput.value && bookHours[i - 1][1] < firstHourInput.value)) {
                            error = false
                            indexOfReservation = i
                            break
                        }
                    } 
                } else {
                    if (secondHourInput.value <= bookHours[0][0]) {
                        error = false
                        indexOfReservation = 0
                        break
                    }
                }
            }
        }

        if (error) {
            firstHourInput.classList.add('red-border')
            secondHourInput.classList.add('red-border')
        }
    }
}

// CHECK ERRORS IN CREATION PANEL
function errorChecker() {
    error = false
    firstNameInput.classList.remove('red-border')
    lastNameInput.classList.remove('red-border')
    boatNameInput.classList.remove('red-border')
    firstHourInput.classList.remove('red-border')
    secondHourInput.classList.remove('red-border')
    

    if (firstNameInput.value === '') {
        error = true
        firstNameInput.classList.add('red-border')
    }
    if (lastNameInput.value === '') {
        error = true
        lastNameInput.classList.add('red-border')
    }
    if (boats.indexOf(boatNameInput.value) === -1) {
        error = true
        boatNameInput.classList.add('red-border')
    }
    if (firstHourInput.value === '') {
        error = true
        firstHourInput.classList.add('red-border')
    } 
    if (secondHourInput.value === '') {
        error = true
        secondHourInput.classList.add('red-border')
    }
    if (parseInt(firstHourInput.value) < 9) {
        error = true
        firstHourInput.classList.add('red-border')
    }
    if (parseInt(secondHourInput.value) > 21) {
        error = true
        secondHourInput.classList.add('red-border')
    }
    if (parseInt(firstHourInput.value) == parseInt(secondHourInput.value)) {
        error = true
        firstHourInput.classList.add('red-border')
        secondHourInput.classList.add('red-border')
    }
    // jak beda godziny w stylu 21:05 i 21:50 to nie zadziala
    if (parseInt(firstHourInput.value) > parseInt(secondHourInput.value)) {
        error = true
        firstHourInput.classList.add('red-border')
        secondHourInput.classList.add('red-border')
    }

    if (!error) reservationFinder()
}

// COLOR EVERY ACTIVE HOUR WITH CUSTOM COLOR 

function colorHours(element, expanded) {
    const hoursDiv = element

    Array.from(hoursDiv.children).forEach(hour => {

        const hourValue = parseInt(hour.firstChild.textContent)

        if ((hourValue >= parseInt(firstHourInput.value) && hourValue < parseInt(secondHourInput.value))) { 
        
            hour.classList.add('active-hour')
        
            if (hour.dataset.customColor === undefined) {
                hour.dataset.customColor = $newColor
            } 
            hour.style.backgroundColor = $newColor
        
            console.log(hour.dataset)
        }
        
        if (expanded) {
            if (hour.dataset.customColor === undefined) {
                hour.dataset.customColor = $newColor
            }

            if (hour.classList.contains('active-hour')) {
                hour.style.backgroundColor = hour.dataset.customColor
            }
        }

        // if (inAngleEventListener) {

        //     if (hour.dataset.customColor === undefined) {
        //         hour.dataset.customColor = $newColor
        //     }

        //     if (expanded && hour.classList.contains('active-hour')) {
        //         hour.style.backgroundColor = hour.dataset.customColor
        //     } 
        //     if (!expanded && hour.classList.contains('active-hour')) {
        //         hour.style.backgroundColor = 'rgb(44, 137, 195)'
        //     }

        //     console.log(hour.dataset)
            
        // } else { 
            
        //     const hourValue = parseInt(hour.firstChild.textContent)

        //     if ((hourValue >= parseInt(firstHourInput.value) && hourValue < parseInt(secondHourInput.value))) { 
            
        //         hour.classList.add('active-hour')
            
        //         if (hour.dataset.customColor === undefined) {
        //             hour.dataset.customColor = $newColor
        //         } 
            
        //         hour.style.backgroundColor = 'rgb(44, 137, 195)'
        //         console.log(hour.dataset)
        //     }
        // }
        
    })
}

// SUBMITING RESERVATION
submitBtn.addEventListener('click', () => {
    errorChecker()
    if (!error) {
        addNewReservation()
        creationPanelCleaner()
    }
})

// CLEANING CREATION PANEL (EMPTY INPUTS ETC.)
function creationPanelCleaner() {
    creationPanel.style.top = "calc(-100vh - 500px)"
    firstNameInput.value = ''
    lastNameInput.value = ''
    boatNameInput.value = ''
    firstHourInput.value = ''
    secondHourInput.value = ''
    additionalInfo.value = ''

    firstNameInput.classList.remove('red-border')
    lastNameInput.classList.remove('red-border')
    boatNameInput.classList.remove('red-border')
    firstHourInput.classList.remove('red-border')
    secondHourInput.classList.remove('red-border')
}

// CLEAN EVERY INPUT ON CHANGE
inputs.forEach(input => {
    input.addEventListener('change', () => {
        input.classList.remove('red-border')
    })
})
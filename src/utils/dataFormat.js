import { format, isValid } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';

class dataFormat {

    fullDateBR(props) {

        if (!props) {
            return 0
        }
        else {
            let date = new Date(props);
            return date.toLocaleDateString('pt-br', { timeZone: 'UTC' })
        }
    };

    iso(props) {

        if (!props) {
            return 0
        }
        else {
            const utcStringFormated = props.replace("Z", "")
            let date = new Date(utcStringFormated);

            if (!isValid(date)) {
                return 0
            } else {
                let newDate = format(date, 'yyyy-MM-dd', { locale: ptBR });
                return newDate;
            }
        }


    };

    day(props) {

        if (!props) {
            return 0
        }
        else {
            const utcStringFormated = props.replace("Z", "")
            let date = new Date(utcStringFormated);
            return date.getDate()
        }
    };

    month(props) {

        if (!props) {
            return 0
        }
        else {
            const utcStringFormated = props.replace("Z", "")
            let date = new Date(utcStringFormated);
            return date.getMonth()
        }
    };

    fullMonth(props) {

        if (!props) {
            return 0
        }
        else {
            let date = new Date(props);
            return date.toLocaleDateString('pt-BR', { timeZone: 'UTC', month: 'long' })
        }
    };

    year(props) {

        if (!props) {
            return 0
        }
        else {
            const utcStringFormated = props.replace("Z", "")
            let date = new Date(utcStringFormated);
            return date.getFullYear()
        }
    };
};

export default new dataFormat();
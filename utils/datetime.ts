import moment from "moment";


const date_output_bn = (publish_date: string): string => {
    moment.locale('bn');
    return moment(publish_date).format('dddd, Do MMMM YYYY | a h:mm মিনিট');
};

export default date_output_bn;
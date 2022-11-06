export const extractDateFromDateTimeIso = (dateTimeString: string): string =>
    dateTimeString.includes('T') ? dateTimeString.split('T')[0] : '00:00:00';
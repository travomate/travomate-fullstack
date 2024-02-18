// function which formats the timestamps

export const formatDate = (timestamp) => {
    const postedTime = new Date(timestamp);
    const currentDate = new Date();
    const timeDifference = Math.floor((currentDate - postedTime) / 1000); // Difference in seconds
    if (timeDifference < 60) {
      return `${timeDifference}s ago`;
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes}m ago`;
    } else if (currentDate.getDate() === postedTime.getDate()) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours}h ago`;
    } else if (currentDate.getFullYear() === postedTime.getFullYear()) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${months[postedTime.getMonth()]} ${postedTime.getDate()}`;
    } else {
      return `${
        months[postedTime.getMonth()]
      } ${postedTime.getDate()}, ${postedTime.getFullYear()}`;
    }
  }; 
import BookingForm from '/BookingForm';

const BookingPage = () => {
  const guideId = '12345'; // Replace with dynamic guide ID
  const mode = 'guide'; // or 'train', 'bus', 'cab', 'flight' based on user selection

  return (
    <div className="container mx-auto p-6">
      <BookingForm guideId={guideId} mode={mode} />
    </div>
  );
};

export default BookingPage;

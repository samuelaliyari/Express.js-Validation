const GuestBookList = ({ messageList }) => {
	return (
		<section className='list'>
			{messageList.map((message, index) => (
				<article key={index}>
					<h3>
						{message.firstName} <span>{message.email}</span>
					</h3>
					<p>schreibt:</p>
					<p>{message.message}</p>
				</article>
			))}
		</section>
	);
};

export default GuestBookList;

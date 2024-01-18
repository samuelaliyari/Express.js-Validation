import { useState } from "react";
import GuestBookList from "../components/GuestBookList";
import { useEffect } from "react";

const GuetsBook = () => {
	const [messageList, setmessageList] = useState([
		{
			firstName: "",
			lastName: "",
			email: "",
			message: "",
		},
	]);
	const serverUrl = "http://localhost:3000/api/data";

	const [newMessage, setNewMessage] = useState({});

	//========Initial fetch========
	useEffect(() => {
		fetch(serverUrl)
			.then((res) => res.json())
			.then(({ success, result, error }) => {
				if (!success) console.log(error);
				else setmessageList(result);
			})
			.catch((err) => console.log(err));
	}, []);
	//========Post Fetch Send Message Form Data========

	const sendMessage = () => {
		const formData = new FormData();
		formData.append("firstName", newMessage.firstName);
		formData.append("lastName", newMessage.lastName);
		formData.append("email", newMessage.email);
		formData.append("message", newMessage.message);

		fetch(serverUrl, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then(({ success, result, error, details }) => {
				if (!success) console.log(error, details);
				else setmessageList(result);
			})
			.catch((err) => console.log(err));
	};

	return (
		<main>
			<form>
				<input
					type='text'
					placeholder='Firts Name'
					onChange={(e) =>
						setNewMessage({
							...newMessage,
							firstName: e.target.value,
						})
					}
				/>
				<input
					type='text'
					placeholder='Last name'
					onChange={(e) =>
						setNewMessage({
							...newMessage,
							lastName: e.target.value,
						})
					}
				/>
				<input
					type='email'
					name=''
					id=''
					placeholder='E-Mail'
					onChange={(e) =>
						setNewMessage({
							...newMessage,
							email: e.target.value,
						})
					}
				/>
				<textarea
					name=''
					id=''
					cols='30'
					rows='10'
					placeholder='Your Message'
					onChange={(e) =>
						setNewMessage({
							...newMessage,
							message: e.target.value,
						})
					}></textarea>
			</form>
			<button onClick={sendMessage}>Send Message</button>
			<GuestBookList messageList={messageList} />
		</main>
	);
};

export default GuetsBook;

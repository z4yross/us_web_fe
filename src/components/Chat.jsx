import React from "react";

import { FiArrowRight } from "react-icons/fi";

const Chat = () => {
	const messages = [
		{ author: "test", message: "Lorem ipsum dolor sit amet" },
		{
			author: "test1",
			message:
				"consectetur adipiscing elit. Integer a elit id erat sagittis porta id vitae purus. ",
		},
	];

	return (
		<div className="Chat">
			<div className="ChatMessages">
				{messages.reverse().map((message, i) => {
					return (
						<div className="messageWrapper">
							<div className="messageAuthor">{message.author.toUpperCase()}</div>
                            <div className="messageText">{message.message}</div>
						</div>
					);
				})}
			</div>
			<div className="ChatInput">
				<input type="text" placeholder="Mensaje" />
				<button>
					<FiArrowRight />
				</button>
			</div>
		</div>
	);
};

export default Chat;

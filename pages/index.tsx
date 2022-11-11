import React from 'react';
import Stript from 'next/script';

const HomePage = () => {
	return (
		<>
			<Stript
				src="https://js.yoco.com/sdk/v1/yoco-sdk-web.js"
				defer
				onLoad={() => {
					const sdk = new window.YocoSDK({
						publicKey: 'pk_live_3a24c304R4eNkqv908a4',
					});

					const inline = sdk.inline({
						layout: 'Basic',
						amountInCents: 2499,
						currency: 'ZAR',
					});

					inline.mount('#card-frame');

					const submitBtn = document.getElementById(
						'pay-button',
					) as HTMLButtonElement;
					const form = document.getElementById(
						'payment-form',
					) as HTMLFormElement;
					form?.addEventListener('submit', async event => {
						event?.preventDefault();
						submitBtn.disabled = true;
						try {
							const result = await inline.createToken();
							console.log(result);
							if (result.error) {
								const errorMessage = result.error.message;
								errorMessage && alert('error occured: ' + errorMessage);
							} else {
								const token = result;
								const response = await fetch('/api/yocopayment', {
									method: 'POST',
									body: JSON.stringify(token.id),
									headers: {
										'Content-Type': 'application/json',
									},
								});
								alert('card successfully tokenised: ' + token.id);
							}
							submitBtn.disabled = false;
						} catch (error) {
							submitBtn.disabled = false;
							alert('error occured: ' + error);
						}
					});
				}}
			/>

			<form id="payment-form" method="POST">
				<div className="one-liner">
					<div id="card-frame">
						{/* <!-- Yoco Inline form will be added here --> */}
					</div>
					<button id="pay-button" type="submit">
						PAY ZAR 24.99
					</button>
				</div>
				<p className="success-payment-message" />
			</form>
		</>
	);
};

export default HomePage;

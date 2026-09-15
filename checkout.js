
let orderTotal = localStorage.getItem("orderTotal");

document.getElementById("orderTotal").textContent = orderTotal;

let orderItems = JSON.parse(
    localStorage.getItem("orderItems")
);

let orderSummary = document.getElementById("orderSummary");

if (orderItems) {

    orderItems.forEach(function(item) {

        let itemTotal = item.price * item.quantity;

        orderSummary.innerHTML += `
            <p>
                ${item.icon}
                <strong>${item.name}</strong>
                <br>
                ₹${item.price} × ${item.quantity}
                = ₹${itemTotal}
            </p>
        `;

    });

}


// ======================================
// SHOW PAYMENT INFORMATION
// ======================================

function showPaymentFields() {

    let paymentFields =
        document.getElementById("paymentFields");

    let selectedPayment = document.querySelector(
        'input[name="payment"]:checked'
    );

    if (!selectedPayment) {
        return;
    }

    let payment = selectedPayment.value;


    if (payment === "card") {

        paymentFields.innerHTML = `
            <h3>Credit Card</h3>

            <p>
                You will enter your card details securely
                in Razorpay Checkout.
            </p>
        `;

    }


    else if (payment === "upi") {

        paymentFields.innerHTML = `
            <h3>UPI Payment</h3>

            <p>
                Razorpay Checkout will handle your UPI payment.
            </p>
        `;

    }


    else if (payment === "netbanking") {

        paymentFields.innerHTML = `
            <h3>NetBanking</h3>

            <p>
                Select your bank inside Razorpay Checkout.
            </p>
        `;

    }


    else if (payment === "cod") {

        paymentFields.innerHTML = `
            <p>
                💵 Cash on Delivery selected.
            </p>
        `;

    }

}


// ======================================
// PAYMENT
// ======================================

async function payNow() {

    // Get total amount
    const totalAmount =
        Number(localStorage.getItem("orderTotal"));


    if (!totalAmount || totalAmount <= 0) {

        alert("Invalid order amount");

        return;
    }


    // ==================================
    // DELIVERY DETAILS
    // ==================================

    const name =
        document.getElementById("fullName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const address =
        document.getElementById("address").value.trim();


    if (name === "" || email === "" || address === "") {

        alert("Please enter your delivery details.");

        return;
    }


    // ==================================
    // PAYMENT METHOD
    // ==================================

    const selectedPayment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!selectedPayment) {

        alert("Please select a payment method.");

        return;
    }


    const paymentMethod =
        selectedPayment.value;


    // ==================================
    // CASH ON DELIVERY
    // ==================================

    if (paymentMethod === "cod") {

        alert(
            "Order placed successfully with Cash on Delivery! 🎉"
        );

        localStorage.removeItem("orderTotal");

        localStorage.removeItem("orderItems");

        return;
    }


    // ==================================
    // RAZORPAY PAYMENT
    // ==================================

    try {

        const response = await fetch(
            "https://ai-chatbot-backend-fkyi.onrender.com/create-order",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    amount: totalAmount
                })
            }
        );


        const data = await response.json();


        console.log(
            "Razorpay Order:",
            data
        );


        if (!data.success) {

            alert(
                "Unable to create payment order"
            );

            return;
        }


        // ==================================
        // RAZORPAY OPTIONS
        // ==================================

        const options = {

            key: "rzp_test_TbvYc4H2I71GYm",

            amount: data.order.amount,

            currency: "INR",

            name: "Food Ordering App",

            description: "Food Order Payment",

            order_id: data.order.id,


            // SUCCESS
            handler: function(response) {

                console.log(
                    "Payment Response:",
                    response
                );


                alert(
                    "Payment successful! 🎉"
                );


                localStorage.removeItem(
                    "orderTotal"
                );


                localStorage.removeItem(
                    "orderItems"
                );

            },


            // CUSTOMER DETAILS
            prefill: {

                name: name,

                email: email

            },


            // THEME
            theme: {

                color: "#ff6b00"

            }

        };


        // Create Razorpay checkout
        const razorpay =
            new Razorpay(options);


        // Open Razorpay
        razorpay.open();


    }

    catch (error) {

        console.error(
            "Payment Error:",
            error
        );


        alert(
            "Something went wrong while starting payment."
        );

    }

}


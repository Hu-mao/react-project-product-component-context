import Menu from "../components/Menu";

const Contacts = () => {
    return (
        <div className="mx-auto max-w-4xl p-6">
            <Menu title="Contacts" />

            <div className="rounded-xl bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-2xl font-semibold">
                    Contact Information
                </h2>

                <div className="space-y-4 text-lg">
                    <p>
                        <span className="font-semibold">📍 Address:</span>{" "}
                        123 Main Street, Kyiv, Ukraine
                    </p>

                    <p>
                        <span className="font-semibold">📞 Phone:</span>{" "}
                        +380 (99) 123-45-67
                    </p>

                    <p>
                        <span className="font-semibold">✉️ Email:</span>{" "}
                        info@shop.com
                    </p>

                    <p>
                        <span className="font-semibold">🕒 Working hours:</span>{" "}
                        Mon–Fri: 09:00–18:00
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
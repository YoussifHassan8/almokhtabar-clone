import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { GoChevronLeft, GoChevronRight, GoCheck } from "react-icons/go";

const Checkout = ({ isOpen, onClose }) => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [currentPromoSlide, setCurrentPromoSlide] = useState(0);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    phone: "",
    address: "",
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  });

  const steps = [
    { id: 1, title: "Contact Info", icon: "📱" },
    { id: 2, title: "Appointment", icon: "📅" },
    { id: 3, title: "Confirmation", icon: "✅" },
  ];

  // Updated time slots as requested
  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
  ];

  // Generate day carousel data
  const generateDaySlots = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      days.push({
        date: date.toISOString().split("T")[0],
        dayNumber: date.getDate(),
        dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
        fullDate: date,
      });
    }

    return days;
  };

  const daySlots = generateDaySlots();

  // Promotional carousel content for the success modal
  const promoCarousel = [
    {
      id: 1,
      title: "Refer a Friend & Get 15% Off",
      description:
        "Share your experience and both you and your friend get discounts on your next orders",
      icon: "👥",
    },
    {
      id: 2,
      title: "Download Our Mobile App",
      description:
        "Get faster results, track your history and book tests on the go with our mobile application",
      icon: "📱",
    },
    {
      id: 3,
      title: "Subscribe to Health Insights",
      description:
        "Get personalized health tips and notifications about new tests based on your medical history",
      icon: "💡",
    },
  ];

  // Auto-rotate promo carousel
  useEffect(() => {
    if (showSuccessModal) {
      const interval = setInterval(() => {
        setCurrentPromoSlide((prev) =>
          prev === promoCarousel.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [showSuccessModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDaySelect = (date) => {
    setFormData((prev) => ({
      ...prev,
      appointmentDate: date,
    }));
  };

  const handleTimeSelect = (time) => {
    setFormData((prev) => ({
      ...prev,
      appointmentTime: time,
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    const orderDataObj = {
      user: user.email,
      items: cartItems,
      total: getCartTotal(),
      contactInfo: {
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      },
      appointment: {
        date: formData.appointmentDate,
        time: formData.appointmentTime,
        notes: formData.notes,
      },
      orderDate: new Date().toISOString(),
    };

    console.log("Order submitted:", orderDataObj);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setOrderData(orderDataObj);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    clearCart();
    onClose();
    setCurrentStep(1);
    setShowSuccessModal(false);
    setOrderData(null);
    setFormData({
      email: user?.email || "",
      phone: "",
      address: "",
      appointmentDate: "",
      appointmentTime: "",
      notes: "",
    });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.email && formData.phone && formData.address;
      case 2:
        return formData.appointmentDate && formData.appointmentTime;
      case 3:
        return true;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition duration-200 p-1 rounded-full hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Modern Stepper */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-red-600 border-red-600 text-white"
                        : "border-gray-300 text-gray-500 bg-white"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <GoCheck className="w-5 h-5" />
                    ) : (
                      <span>{step.icon}</span>
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      currentStep >= step.id ? "text-red-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      currentStep > step.id ? "bg-red-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Appointment Details
              </h3>

              {/* Day Selection Carousel */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Day
                </label>
                <div className="flex overflow-x-auto pb-4 space-x-2">
                  {daySlots.map((day) => (
                    <button
                      key={day.date}
                      onClick={() => handleDaySelect(day.date)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center transition duration-200 ${
                        formData.appointmentDate === day.date
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-lg font-semibold">
                        {day.dayNumber}
                      </span>
                      <span className="text-xs">{day.dayName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`py-2 rounded-lg transition duration-200 ${
                        formData.appointmentTime === time
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Any special instructions or notes..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Review & Confirm
              </h3>

              <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
                <h4 className="font-medium text-gray-900 mb-4 text-lg">
                  Order Summary
                </h4>
                <div className="space-y-3">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.name} (x{item.quantity})
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-medium text-base">
                      <span>Total</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
                <h4 className="font-medium text-gray-900 mb-4 text-lg">
                  Contact Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-medium w-24">Email:</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-24">Phone:</span>
                    <span>{formData.phone}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-24">Address:</span>
                    <span className="flex-1">{formData.address}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
                <h4 className="font-medium text-gray-900 mb-4 text-lg">
                  Appointment Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-medium w-24">Date:</span>
                    <span>{formData.appointmentDate}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-24">Time:</span>
                    <span>{formData.appointmentTime}</span>
                  </div>
                  {formData.notes && (
                    <div className="flex">
                      <span className="font-medium w-24">Notes:</span>
                      <span className="flex-1">{formData.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 sticky bottom-0 bg-white">
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg transition duration-200 flex items-center ${
                currentStep === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              <GoChevronLeft className="mr-1" /> Previous
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`px-6 py-3 rounded-lg transition duration-200 flex items-center ${
                  isStepValid()
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next <GoChevronRight className="ml-1" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 flex items-center"
              >
                <GoCheck className="mr-1" /> Place Order
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Success Modal with Carousel */}
      {showSuccessModal && orderData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Order Placed Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Your order has been submitted and you will receive a
                confirmation email shortly.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-green-800 mb-2">
                  Order #:{" "}
                  {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </h3>
                <p className="text-sm text-green-700">
                  We'll send detailed instructions to your email
                </p>
              </div>
            </div>

            {/* Promotional Carousel */}
            <div className="bg-gray-50 p-6 border-t border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">
                What's Next?
              </h3>

              <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-sm">
                {promoCarousel.map((promo, index) => (
                  <div
                    key={promo.id}
                    className={`flex flex-col items-center text-center transition-opacity duration-500 ${
                      index === currentPromoSlide
                        ? "opacity-100"
                        : "opacity-0 absolute"
                    }`}
                    style={{ width: "100%" }}
                  >
                    <div className="text-4xl mb-4">{promo.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      {promo.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{promo.description}</p>
                  </div>
                ))}

                <div className="flex justify-center mt-4 space-x-2">
                  {promoCarousel.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPromoSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentPromoSlide
                          ? "bg-red-600 scale-125"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Appointment
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {orderData.appointment.date}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">
                        {orderData.appointment.time}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Order Total
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p className="flex justify-between">
                      <span className="text-gray-600">Items:</span>
                      <span className="font-medium">
                        {orderData.items.length}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-medium">
                        ${orderData.total.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCloseSuccessModal}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

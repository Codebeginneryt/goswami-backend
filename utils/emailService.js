import nodemailer from 'nodemailer'

// Create transporter (configure with your email service)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password'
  }
})

export const sendBookingEmails = async (booking, packageData) => {
  const customerEmail = {
    from: process.env.SMTP_USER || 'your-email@gmail.com',
    to: booking.email,
    subject: 'Booking Confirmation - Goswami Holidays Hub',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #240D8C;">Booking Confirmation</h2>
        <p>Dear ${booking.firstName} ${booking.lastName},</p>
        <p>Thank you for booking with Goswami Holidays Hub!</p>
        <h3>Booking Details:</h3>
        <ul>
          <li><strong>Package:</strong> ${booking.packageName}</li>
          <li><strong>Destination:</strong> ${packageData.destination}</li>
          <li><strong>Duration:</strong> ${packageData.duration} days</li>
          <li><strong>Travel Date:</strong> ${new Date(booking.travelDate).toLocaleDateString()}</li>
          <li><strong>Adults:</strong> ${booking.numberOfAdults}</li>
          <li><strong>Children:</strong> ${booking.numberOfChildren}</li>
        </ul>
        <p>We will contact you shortly to confirm your booking.</p>
        <p>Best regards,<br>Goswami Holidays Hub</p>
      </div>
    `
  }

  const adminEmail = {
    from: process.env.SMTP_USER || 'your-email@gmail.com',
    to: process.env.ADMIN_EMAIL || 'admin@goswamiholidayshub.com',
    subject: 'New Booking Received - Goswami Holidays Hub',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #240D8C;">New Booking Received</h2>
        <h3>Customer Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${booking.firstName} ${booking.lastName}</li>
          <li><strong>Email:</strong> ${booking.email}</li>
          <li><strong>Phone:</strong> ${booking.phone}</li>
          <li><strong>Address:</strong> ${booking.address}, ${booking.city}, ${booking.state} ${booking.zipCode}</li>
        </ul>
        <h3>Booking Details:</h3>
        <ul>
          <li><strong>Package:</strong> ${booking.packageName}</li>
          <li><strong>Destination:</strong> ${packageData.destination}</li>
          <li><strong>Duration:</strong> ${packageData.duration} days</li>
          <li><strong>Travel Date:</strong> ${new Date(booking.travelDate).toLocaleDateString()}</li>
          <li><strong>Adults:</strong> ${booking.numberOfAdults}</li>
          <li><strong>Children:</strong> ${booking.numberOfChildren}</li>
          ${booking.specialRequests ? `<li><strong>Special Requests:</strong> ${booking.specialRequests}</li>` : ''}
        </ul>
        <p>Booking ID: ${booking._id}</p>
      </div>
    `
  }

  try {
    await transporter.sendMail(customerEmail)
    await transporter.sendMail(adminEmail)
    console.log('Booking confirmation emails sent successfully')
  } catch (error) {
    console.error('Error sending emails:', error)
    throw error
  }
}


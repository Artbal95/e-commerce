const forgotPasswordMail = (sendingLink: string, recipient_name: string) => `
    Recover password 
    <table class="wrapper" width="100%" cellpadding="0" cellspacing="0">
            <td align="center">
                <table class="main" width="100%" cellpadding="0" cellspacing="0">
                    <h1>Hi ${recipient_name}! Recover your password</h1>
                    <p>To change your password follow the link!
                                
                        <p style="font-size: 24px; font-weight: 600">${sendingLink}</p>
                        Go to our website to change your password. 
                        If you have any questions, send us an email yurakhachatryan3@gmail.com.
                        We're glad you're here!
                    </p>
                                
                    <p>If you didn't send any request to change your password, please ignore this email.
                        It will be invalid in 1 hour.
                    </p>
                    <p>Thanks,<br>The team</p>
                </table>
            </td>
    </table>
    <table class="footer" width="100%" cellpadding="0" cellspacing="0" align="center">
        <tr>
            <td align="center">
                <p>
                    <a href="https://e-commerce.am/">e-commerce.am</a> |
                    <a href="mailto:support@example.com">support@example.com</a>
                </p>
            </td>
        </tr>
    </table>
`;
export default forgotPasswordMail;

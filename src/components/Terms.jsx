import React from 'react'

export default function Terms({setShowTerms}) {
  return (
    <div className="fixed inset-0 bg-[#ffffff8f] bg-opacity-70 z-50 flex items-center justify-center">
        <div className="bg-white max-w-2xl w-full h-[90vh] p-6 rounded-lg overflow-y-auto relative shadow-xl">
        <button
            onClick={() => setShowTerms(false)}
            className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-black"
        >
            ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
        <div class="terms" >
        <div class="terms-of-use">
            <h3>Terms of use</h3>
            <main>
                Hello friends! You are always welcome to be a part of TWP. However, to be part of this
                wonderful family, you have to abide by our rules.
                All Services of TWP, TWP website or its content or platform ("Our Services") are brought to you
                ("you", "your", "User" or "Users") by TWP ("TWP", "we", "us" "our")
            </main>
            <ol>
                <li>
                    Your Acceptance of our Terms of Use
                    Hence, by using any of our services, you hereby agree to:
                    <ul>
                        <li>these TWP Terms of Use ("The Terms")</li>
                        <li>our Community Policy and Content Guidelines</li>
                        <li>our Privacy Policy.</li>
                    </ul>
                    which are collectively referred to as "Our Policy"
                    If you are using Our Services on behalf of another person or entity, you agree that you have the
                    authority to bind that person or entity to Our Policy.
                </li>
                <br/>
                <li>
                    Modifications
                    Our Policy could be modified from time to time and such modifications would be published on
                    the TWP Website. We may notify you of any modifications we make that affects your rights by
                    notifying you via email or by updating the date on the website. You should also frequently review
                    Our Policy on the TWP website in case of any modifications.
                    All modifications will take effect immediately after posting, and your continued use of Our
                    Services after we post the modified version will confirm your acceptance of such modifications.
                </li>
                <br/>
                <li>
                    Conditions of Use
                    <div class="ab"><span>(a)</span> Age. You agree that you are at least 14 years old and are competent to enter into the terms,
                        conditions, obligations, affirmations, representations, and warranties set forth in The Terms, and
                        to abide by and comply with The Terms. Our Services are intended for users who are 14 years
                        and above. If you do not meet this requirement, please do not use Our Services.
                    </div>
                    <div class="ab"><span>(b)</span> General Use.
                        You agree that you will not interfere with the operation of Our Services, or use Our Services in a
                        manner that violates any laws. Such manners may include, but are not limited to:
                        <ul>
                            <li>making use of or gaining unauthorized access to another user's account or
                                impersonating any person or entity in the use of Our Services
                            </li>
                            <li>
                                advertising or promoting goods or services through Our Services without TWP’s
                                permission nor distributing unauthorized materials through Our Services
                            </li>
                            <li>
                                harvesting or compiling any content or personal information from or through Our Services
                            </li>
                            <li>
                                acting in any manner that would harm TWP’s network, system or infrastructure
                            </li>
                            <li>
                                reverse-engineering, deciphering, decompiling or disassembling any of the software
                                comprising Our Services or any software making up a part of Our Services. You will not
                                even make an attempt to do any of the above mentioned acts.
                            </li>
                            <li>
                                attempting to probe or test the vulnerability of, or breach the security of any system in TWP.
                            </li>
                            <li>
                                engaging in any activity that restricts or inhibits any person from using or enjoying Our Services.
                            </li>
                        </ul>
                        You agree that you will not access or use, or attempt to access or use, Our Services to take any
                        action that could harm TWP, service providers, licensors, or any other third party.
                        Any attempts to do these may result in legal actions.
                    </div>
                    <div class="ab"><span>(c)</span> Content:
                        <ul>
                            <li>
                                You agree that TWP does not guarantee any confidentiality regarding any content you
                                post or submit.
                            </li>
                            <li>
                                You agree that we may use automated systems and personnel to review, monitor, and
                                moderate content submitted by Users to Our Services ("User Uploads"), every
                                webcomic or content provided on Our Services ("e-content"), and other content on Our
                                Services in order to screen or watch out for any violations of Our Policy.
                            </li>
                        </ul>
                    </div>
                </li>
                <br/>
                <li>General Use of the Website
                    <div class="ab"><span>(a)</span> Creation of your account:
                        Some of your details may be required to create a User account for you, which you may need to
                        access some of Our Services. You agree that you are responsible for providing accurate
                        account information, for keeping your username and password confidential, and for all activities
                        occurring under your account. You agree to quickly notify us of any suspicious access to your
                        account or of any unauthorized use of your username and password. We will not be liable to you
                        for any losses you incur as a result of someone else's access to your username, password or
                        account, with or without your knowledge and you may be held liable for losses incurred by TWP
                        or others due to any unauthorized use of your username, password or account.
                    </div>
                    <div class="ab"><span>(b)</span>  Actions Disallowed.
                        You agree that you will not modify, reverse engineer, decompile or reproduce Our Services or
                        the e-content.
                        You agree that you will not, whether in whole or in part, create any derivative works from Our
                        Services or the e-content.
                    </div>
                    <div class="ab"><span>(c)</span> Upgrading.
                        In order to keep the TWP website updated, certain upgrades may be made to the TWP website.
                    </div>
                </li>
                <br/>
                <li>
                    Licensing
                    <div class="ab"><span>(a)</span> License of Digital Content
                        TWP grants you a limited, non-exclusive, revocable and non-transferable license to access and
                        view the e-content, your use of which must be consistent with Our Policy. E-content is not sold,
                        transferred, or assigned to you and the license granted to you does not transfer any
                        ownership right to you.
                    </div>
                    <div class="ab"><span>(b)</span> License Limitations
                        You agree that you will not copy, sell or sublicense the e-content. You agree that you will not
                        make available or claim any rights to the e-content, except your own User Uploads.
                        You agree that you will not remove or alter any trademark, service mark or logo or any copyright
                        or other intellectual property notices on or in the e-content.
                        You agree that you will not copy, modify, translate or create derivative works or adaptations of
                        the e-content except your own User Uploads.
                        You agree that you will not do or attempt to do any of these acts: circumvent, modify, remove,
                        deactivate or impair any digital rights management software, encryption, authentication or any
                        technology used to deliver or protect the e-content.
                    </div>
                </li>
                <br/>
                <li> Ownership of Digital Content. You agree that Our Services, the e-content made available
                    on Our Services are owned by TWP or licensed by their respective copyright owners to TWP.
                    TWP does not transfer any interest or right to Our Services and/or e-content to you.
                    The TWP website and all elements of Our Services are protected by the laws of the Federal
                    Republic of Nigeria.
                </li>
                <br/>
                <li>Privacy.
                    <div class="ab"><span>(a)</span> We take very serious, matters with regards to privacy, and hence we have established certain
                        policies that relates to the way we collect and use your personal information in connection with
                        your use of Our Services. Please read our Privacy Policy to understand how we collect and use
                        your personal information.
                    </div>
                    <div class="ab"><span>(b)</span> Every information you share in public activities through Our Services are open to and can be
                        seen or copied by other Users of such public activities. Hence, you must be cautious and don't
                        reveal personal information while participating in such activities. We will not be responsible for
                        any information you choose to post in these public areas.
                    </div>
                    <div class="ab"><span>(c)</span> Your access to any third-party services (such as Facebook, Instagram or any other third party
                        sites) through Our Services may require you to share some information with these third-party
                        services, including information about your activity on Our Services. Hence, you should also read
                        through their Privacy policy in order to be well informed. We will not be held responsible for any
                        damages caused by your access to such third parties.
                    </div>
                    <div class="ab"><span>(d)</span> Personal information are not intentionally collected by TWP, from Users below the age of 14.
                        Any guardian who believes that a User under the age of 14 may have provided personal
                        information without their consent should contact us via our email
                        (thewebtoonproject@gmail.com). We may delete the personal information of such Users in such
                        cases. However, parents or legal guardians should supervise their children whenever they
                        participate in online activities.
                    </div>
                    <div class="ab"><span>(e)</span> TWP may choose to share certain information with you about Our Services via mediums
                        determined by us, including through the contact information you provide during your account
                        creation process. Hence, you agree to receive communications from TWP which may include,
                        but are not limited to: sending notifications of any modifications done to Our Policy, sending
                        surveys or questionnaires for development and proper functioning of TWP, sending alert
                        notifications if by any chance you default on your part to adhere to Our Policy, sending
                        notifications of any new products, services or programs which TWP may have or intend to have
                        and other notifications we may need to share with you.
                    </div>
                </li> 
                <br/>
                <li>User Uploads and Contributions
                    <div class="ab"><span>(a)</span> User Uploads. You agree that you grant us a non-exclusive, perpetual, irrevocable,
                        royalty-free, transferable, sublicensable license to access, use, host, cache, store, reproduce,
                        transmit, modify, create derivative works of, advertise, publish, distribute and monetize your
                        User Uploads in order to maintain and improve Our Services, and to do so in any media we
                        choose.
                        You agree that we may use the e-content, User Uploads or any derivative works throughout the
                        world, to promote, market, and publicize Our Services, and that we may do so in any language,
                        formats and media, whether currently existing or hereafter created.
                        You warrant that you own, or have obtained, all rights, licenses, consents, permissions, power
                        and authority necessary to grant the rights that you grant to us for any User Uploads which you
                        upload on Our Services.
                        You warrant that your User Uploads will be in keeping with our Content guidelines.
                    </div>
                    <div class="ab"><span>(b)</span> Contributions. Feel free to give your contributions, suggestions and feedbacks regarding
                        improvements to Our Services. However, you agree to assign any and all rights you have
                        regarding the contribution, suggestions or feedback you give. You acknowledge and agree that
                        any contribution or suggestion you give does not grant you any right or title in Our Services or in
                        such contribution or suggestion and that TWP may use and disclose them in any manner and
                        for any purpose whatsoever without further notice or compensation to you and without retention
                        of any rights or claims by you.
                    </div>
                </li> 
                <br/>
                <li>Advertisements:
                    <div class="ab"><span>(a)</span> You agree that TWP may provide any advertisements to you online or offline.
                        Advertisements may consist of scripts, graphics, audio, video, texts or a combination of these,
                        majorly for the purpose of promoting a third-party's product or services and may direct the User
                        to an external link or page.
                    </div>
                    <div class="ab"><span>(b)</span> Our Services may contain links to third party services, contents and platforms, like social
                        media sites. You should use any linked third-party service or content with caution as we do not
                        control the contents of those sites. Hence, we accept no responsibility for them or for any loss or
                        damage that may arise from your use of them. If you have any concerns regarding such
                        third-party service, you should contact their customer care.
                    </div>
                </li>
                <br/>
                <li>Termination of Use
                    You agree that TWP reserves the right to modify your operation of, or suspend or terminate your
                    access to Our Services or to the e-content, whether for a season or permanently; completely or
                    partially.
                    You agree that your use of Our Services will be terminated if you fail to comply with any term in
                    Our Policy.
                    You agree that TWP reserves the right to interrupt the operation of Our Services, completely or
                    partially as necessary to perform maintenance, or any other changes.
                    You agree that if at any time, TWP fails to exercise or enforce any term in Our Policy, such term
                    and TWP's rights will not be waived.
                </li>
                <br/>
                <li>FACE OF TWP Contest
                    This is a character contest organized by TWP, which allows users and character fans to
                    nominate and vote their favorite characters to be on display on any TWP advertisement.
                    The character that eventually wins the contest will be displayed on any TWP advertisement (as
                    the "Face of TWP") till the next Face of TWP contest takes place or for the duration of time
                    which TWP chooses.
                    In the first round, you are allowed to nominate your favorite character(s) for the election. From
                    the nominations, TWP will draft out a list of names of the nominated characters which will be
                    qualified for the second round.
                    In the second round, you are allowed to vote for any character of your choice.
                    You are allowed to vote for only one character. However, you can give more than one vote for
                    only that character.
                    You agree that after the final round, TWP reserves the right to determine the character that wins
                    the contest which could be based on, but not limited to, the number of votes each character has.
                </li>
                <br/>
                <li>Scripture For The Week
                    You agree that every week, a scripture would be on display on Our Services or Website.
                </li>
                <br/>
                <li>Disclaimers and Warranties.
                    You agree that the use of the e-content or Our Services is at your own risk. We do not make any
                    warranty of any kind which may include, but are not limited to, availability, accuracy, ability to
                    meet your needs or preferences, fitness for a particular purpose, satisfactory quality,
                    non-infringement and others; under the laws of any jurisdiction.
                    We do not warranty that your use of Our Services will be free of interruptions, errors or any
                    harmful component.
                    Hence, TWP will not be responsible for any damage to your mobile desktop, tablet or any
                    technical device, property or software. TWP will not be responsible for any loss of data or for
                    any injury which may have been secured from your use of Our Services.
                    You agree that TWP does not take responsibility for any product or service offered or advertised
                    by a third party through Our Services and TWP will not monitor any transaction you make with a
                    third party. No advice or information from TWP grants a warranty, hence, you must be very
                    cautious in your dealings with third party sites.
                </li>
                <br/>
                <li>Indemnification.
                    You agree to indemnify and release TWP, its employees, affiliates, officers, agents, directors,
                    collaborators and representatives from any losses or liabilities. You agree to indemnify TWP
                    from all causes of action, claims, injuries, damages or costs of any kind arising in connection
                    with any of Our Services or relating to delivery, misdelivery, acceptance, possession, use of or
                    inability to use any benefits or relating to personal injuries, death or destruction of property. You
                    agree to indemnify TWP from any losses related to rights of publicity or privacy, tort, warranty or
                    defamation whether done intentionally or not, whether under a theory of contract or not.
                </li>
                <br/>
                <li>
                    15. Laws and Rights:
                    You agree that your use of Our Services will be in compliance with applicable laws. All licenses
                    are non-exclusive and any rights not expressly granted in Our Policy are reserved to TWP.
                    16. Limitation of Liability.
                    <div class="ab"><span>(a)</span> When permitted by law, TWP, its licensors and employees will not be responsible for any
                        indirect, accidental, special, consequential, or punitive damages, errors, loss of revenue or
                        profit, financial losses, breach of any warranty or contract, negligence, tort or any legal theory
                        related to Our Services.
                    </div>
                    <div class="ab"><span>(b)</span> You agree and acknowledge that TWP will not be held responsible for any damages caused
                        by any third party.
                    </div>
                    <div class="ab"><span>(c)</span> The total liability of TWP, regarding any claim arising under The Terms is limited to the
                        amount you paid to use Our Services.
                    </div> 
                    <div class="ab"><span>(d)</span> In case of bankruptcy, TWP reserves the right to deny all benefits and obligations that it may
                        have.
                    </div>
                    <div class="ab"><span>(e)</span> You agree that TWP has the right to suspend, delete or cancel User accounts as well as
                        cancel any User benefits if bugs, errors, unauthorized human intervention, viruses or any cause
                        that affects the administration, security or proper handling of the benefits arise or if TWP
                        becomes incapable of running the program as planned.
                    </div> 
                    <div class="ab"><span>(f)</span> Our Policy shall be construed and interpreted under the laws of the Federal Republic of
                        Nigeria.
                    </div> 
                    <div class="ab"><span>(f)</span> You agree to abide by Our Policy and you agree that all that has been mentioned in The
                        Terms are enforceable and valid to the extent permitted by Law.
                    </div>
                </li>
                <br/>
                <li>17. Contact
                    If you have any questions, feedbacks or contributions, please contact us at:
                    <a href="thewebtoonproject@gmail.com">thewebtoonproject@gmail.com</a>
                    LAST MODIFIED: 20th January 2025
                </li>
                <br/>
            </ol>
        </div>
        <div class="community-policy">
            <h3>TWP Community Policy and Content Guidelines</h3>
            <main>
                <p><b>Community Policy and Content Guidelines.</b> <br/>
                    All Services of TWP, TWP website or its content or platform ("Our Services") are brought to you
                    ("you", "your", "User" or "Users") by TWP ("TWP", "we", "us", "our")
                    Every member of the TWP community (that is, our readers, employees, authors {`ie writers and
                    illustrators`}, and fans), all collectively called "TWP Elites" are expected to abide by the rules,
                    policies and guidelines mentioned on this page.
                    These policies and guidelines, together with the Terms of Use, privacy policy and every other
                    policy of TWP are to be followed appropriately. If you do not adhere to them, you may not use
                    Our Services.
                </p>
                <p><b>Community Policy and Code of Conduct</b> <br/>
                    We intend to build oneness and unity amongst TWP Elites. Hence, we have compiled the
                    following "dos" and "don'ts"
                </p>
            </main>
            <p>
                <b>"Dos"</b> 
                <ol>
                    <li>Respect everyone you meet: Give respect in or through your attitude, comments, posts,
                        or in any form whatsoever.
                    </li>
                    <li>Keep your personal information private. Be careful not to share any of your private
                        information or details in public activities and be careful of who you share them with,
                        whether on the TWP platform or outside the platform.
                    </li>
                    <li>Report any suspicions you have. If you suspect your account has been impersonated or
                        have any other suspicions, please report to us via our contact email on the website.
                    </li>
                    <li>Report any content or comment you believe is inappropriate. Feel free to report any
                        content you believe is not appropriate or in keeping with our content guidelines.
                        However, TWP reserves the right to make the final decision as regards to whether such
                        content is inappropriate or not. We will review such content and if the report is justified,
                        such content will be removed and the author, warned and/or banned.
                    </li>
                </ol>
            </p>

            <p>
                <b>"Don'ts"</b>
                <ol>
                    <li>Do not make any insulting, abusive, hateful or threatening statements or behaviors
                        towards any User, staff or any other TWP Elite.
                    </li>
                    <li>Do not making any sexual advances or similar behaviors towards any TWP Elite, and do
                        not make sexual comments, jokes, links or the like on any of our platforms.
                    </li>
                    <li>Do not impersonate someone else or gain unauthorized access to someone else's
                        account. We do not allow the use of same username or information as another User.
                    </li>
                    <li>Do not post or threaten to post another User's personal details (including their phone
                        numbers, real names, home or email addresses etc) without his or her consent.
                    </li>
                    <li>Do not spam. Do not post any unwanted or deceptive content or any content that
                        infringes on the privacy or on other rights of other TWP Elites. Do not post any unwanted
                        or unsolicited links on any of our Services and do not create any or multiple accounts for
                        the purpose of promoting commercial products or services or for driving traffic to external
                        websites or platforms. Any content or activity we take note of and deem to be spam will
                        result in warnings and/or banning of your account and in removal of such content.
                    </li>
                    <li> Do not artificially increase the number of subscribers, user engagement, view counts or
                        other metrics whether through automated systems, third-party services, creating multiple
                        accounts or through any unwanted means.
                    </li>
                    <li> Do not trade, rent, sell or gift your account or any account to anyone.
                    </li>
                    <li> Do not behave or act in any way (on our platform or outside our platform) that affects TWP Elites.</li>
                </ol>
                <div>
                    Not adhering to any of these may result in warnings and/or banning of your account (with or
                without notice) and TWP reserves the right to take necessary action when any of our guidelines
                are defaulted.
                </div>
            </p>
            <p><b>Content Guidelines</b> <br/>
                As an author, you retain full ownership of the webtoon or comics which you upload on our
                platform. TWP will never claim ownership or rights over your intellectual property. However, to
                draw attention to your works and help amplify them, TWP may create derivatives from your
                series or create advertising videos, graphics, texts, images etc for marketing and promotional
                purposes.
                All authors of TWP are expected to abide by Our Policy, even in the content which they submit
                or upload.
                As a measure for filtering unwanted contents, TWP has devised a system that paves way for
                approval of all content before they are published on the TWP platform. This means that as an
                author, the content which you upload will first be approved by us, before they can be published
                on the platform.
                These are the content rules and guidelines which binds every content published on any of our
                platforms:
            </p>
            <p><b>A. Ownership and Intellectual property rights and Impersonation</b> <br/>
                For every content you submit or upload, you must possess all its ownership rights. Your content
                must never infringe on the rights of another User or author, including but not limited to the
                copyright, trademark or any other intellectual property rights of another User or author.
                You must NOT engage in piracy of another User's content nor share any copyrighted content
                nor share links to any pirated content without consent from the copyright owner(s).
                If by any chance, we notice that the content you submit fails to meet up with these guidelines,
                they will not be approved, and if already approved, will be taken down immediately.
                You are NOT allowed to post or submit content that is intended to impersonate another author
                (whether the author is a TWP Elite or not)
            </p>
            <p><b>B. Sexual content</b> <br/>
                All forms of sexual content are NOT allowed in any of Our Services or platforms. Nudity (full or
                partial), indecent dressing of webtoon characters or artworks, depicting sexual actions are NOT
                allowed on any part of the e-content whether on the cover pages, thumbnails, banners or posts
                or anywhere in or around your User Uploads or on our platform.
                Erotic content, content intended for sexual gratification or porn content are NOT allowed.
                Any content that promotes any and all forms of sexual relations including, but not limited to
                LGTBQ, bestiality, incest, grooming etc are NOT allowed.
                Any content with any of these will be DISAPPROVED or TAKEN DOWN by TWP.
            </p>
            <p><b>C. Content depicting violence, self-harm, illegal or dangerous acts</b>
                We do not allow contents that promote or glorify the following:
                <br/>
                ● suicide or self harm <br/>
                ● animal/human assault, forced sexual abuse, sexual assault etc. <br/>
                ● social vices, criminal activities or terrorism <br/>
                ● brutal acts of violence <br/>
                ● use of illegal drugs, weeds or substances. <br/>
                ● rebellion against and hatred towards authorities. <br/>
                Any content that promotes any of the above will be disapproved and/or taken down. Uploading
                or submitting contents that promote or glorify any of the above and doing so more than once
                could result in warnings from us or even banning of your account.
            </p>
            <p><b>D. Contents that promote identity crisis.</b>
                We do NOT allow content that promote or glorify identity crisis or problems (e.g Transgender
                etc)
            </p>
            <p><b>E. Hateful Content</b>
                We do NOT allow content that is directed (whether intentional or not) at attacking or provoking
                hatred towards any particular race, User, author, group of people etc.
                Use of hate speech symbols, abusive language, curse words are NOT allowed.
            </p>
            <p><b>F. Advertisements</b>
                Making advertisements on your content, unrelated to such content are NOT allowed.
                You are NOT allowed to place links or advertisements intended to redirect traffic from the TWP
                platform to any third party sites, not related to the content.

                <p>
                    <b>Upload Pixel Dimensions and Format</b> <br/>
                    <p>
                        <b> A. The coverpage</b> <br/> The coverpage of your webtoon should be 1080 * 1080 pixels
                    </p>
                    <p>
                        <b> B. The chapter content of your series</b> <br/> 
                    To Upload your webtoon on TWP your full chapter image must be divided into smaller sections. <br/>
                        These smaller sections must be in the dimension: <b>1080 * 1920 pixels</b>(that is, <b>1080 pixels</b> wide and <b>1920 pixels tall</b> )
                    </p>
                    <p>
                        <b> C. The Thumbnails</b> <br/>
                        You can choose any of the pictures from the chapter you are uploading to ba used as the thumbnails for the chapter.
                        <br/>
                        <b>JPG</b> and <b>PNG</b> format allowed.
                    </p>
                </p>
            </p>
            <p><b>TWP Content Approval System</b>
                When you first upload or submit a content, it will first be screened and approved by us, before it
                is published on the platform.
                An uploaded content may take up to 3 - 4 working days to be approved, depending on the the
                workload and number of contents to be approved.
                We will attempt to notify you if your content has been approved. We may or may not notify you if
                your content has been disapproved.
                TWP reserves the right to disapprove or cancel any content that does not meet up to our
                guidelines or any content which we are not in support of.
                If subsequently, TWP detects in an already-approved or ongoing series or webtoon, some
                content that defaults or does not meet up with Our Policy, or content which we are not in support
                of, TWP reserves the right to take down that episode or chapter or even take down the entire
                series without notice, and such author's account may be subject to further review.
                Any account that poses a threat to or carries out any action deemed to be harmful to TWP or to
                TWP Elites will be banned. Furthermore, TWP will not welcome any attempt to circumnavigate a
                ban, whether through creation of other accounts or whatever means.
            </p>
            <p><b>Reporting</b>
                Feel free to report any content, including comments, series/uploads or feedbacks, which you
                believe is not appropriate or in keeping with our content guidelines.
                To give any report, contact us via our email: <a href="thewebtoonproject@gmail.com">thewebtoonproject@gmail.com</a> or via the 'contact
                us' link on the menu bar at the top right corner of the TWP homepage.
                To report any series, send us a message stating the name of the series, the specific URL of the
                series, the reason why you believe the series is inappropriate, and if related to copyright
                infringement, provide evident proof of the real copyright owner. To report any comments or
                feedback, send us a message with a screenshot of the specific comment or feedback, the
                specific URL of the series or page where the comment or feedback was mentioned, the reason
                why you believe the comment or feedback is inappropriate.
                Reported series, comments or feedback will be reviewed and if the report is justified, will be
                removed and the author warned and/or banned.
                Please do not give any false reports. Such acts will NOT be tolerated and may result in actions
                being taken against the reporters' account.
            </p>
            <p><b>Feedback</b>
                If you have any questions, feedbacks or contributions, please contact us at:
                <a href="thewebtoonproject@gmail.com">thewebtoonproject@gmail.com</a>
                LAST MODIFIED: 20th January 2025
            </p>
        </div>
        <div class="privacy-policy">
            <h3>Privacy Policy</h3>
            <main>
                <p>TWP<b> ("TWP", "we", "us" "our")</b>
                    <p>respects your privacy and hence, has established certain policies and procedures relating to the
                        collection and use of your personal information in connection with your use of all services of
                        TWP, TWP website or its content or platform ("Our Services"). Your use of Our Services
                        indicates that you agree with Our Policy, including this privacy policy.
                    </p>
                </p>
            </main>
            <p><b>The Information we get or access from or about you, and how we get them</b><br/>
                A. Account creation and access to Our Services <br/>
                When you create an account, we will require your personal information such as name, date of
                birth, email address, password. <br/>
                By accessing Our Services, we automatically gain access to other details about you such as
                your Internet protocol (IP) addresses, date/time stamp, operating system (mobile or laptop),
                mobile network information including carrier name and phone number, browser type and setting,
                location information, system activity, hardware settings etc.
            </p>
            <p>B. Your activities <br/>
                We keep track of every activity you perform on our platform, including but not limited to your
                comments, contributions, feedbacks, chats etc.
            </p>
            <p>C. Your messages to us via any medium we provide
                When you send us a message via "contact us" link, your message will be stored on our
                database for references and other purposes. Your messages to our email are also stored as
                well as through any other means we provide, whether currently existing or future means not yet
                created or adopted.
            </p>
            <p>D. Your participation in any program, event or surveys organized by us. <br/>
                When participating in any form of programs including but not limited to contests, surveys etc, we
                may request or access your personal information such as your name, age etc.
            </p>
            <p>E. Tracking Technologies <br/>
                We use tracking technologies such as cookies to keep track of User activities around the
                website and improve user experience by identifying their interests and preferences. You can
                disable cookies in your browser settings, but this may limit your use of some of the functionality
                of Our Services.
            </p>
            <p><b>What we do with the information we get</b> <br/>
                To provide better User experience on our platform
                To operate and maintain Our Services
                To verify and process your creation of TWP account
                To allow you manage your TWP account and/or conduct any other activities on Our Services
                For research purposes in order to improve Our Services to you and in order to develop new
                products and/or services for you
                To provide adequate customer care and support to you
                For promotional and marketing purposes
                To contact you when necessary
                To notify you of any important information regarding Our Services
                To enhance confidentiality and improve security
                For enforcement of Our Policy
                To monitor, prevent, identify, investigate, and report any violations, unauthorized use of and/or
                abuse of Our Services and/or suspected illegal activities
            </p>
            <p><b>Who we share it with</b> <br/>
                We do not trade, sell or rent your personal information to external parties without your
                permission.
                However, we may share your personal information with third party service providers that work
                with TWP in providing you Our Services. Hence, there may be a transfer of your information
                countries outside your country of residence.
                In cases of business liaise, sale or transfer of all or a part of our business or assets, we may
                share your personal information with such businesses.
                Also, for legal purposes, we may share your personal information with any law enforcement
                agencies or authorities or as may be required by applicable laws.
            </p>
            <p><b>Third party sites</b> <br/>
                Your access to any third-party services (such as Facebook, Instagram or any other third party
                sites) through Our Services may require you to share some information with these third-party
                services, including information about your activity on Our Services. Hence, you should also read
                through their Privacy policy in order to be well informed. <br/> We will not be held responsible for any
                damages caused by your access to such third parties.
            </p>
            <p><b>Security measures</b> <br/>
                We are very careful in the way we manage your personal information and we set appropriate
                measures in place to secure and maintain privacy of your personal information which we collect.
                Some security measures which we have adopted include but are not limited to: <br/>
                Encryption of your personal information <br/>
                Encryption of passwords Authentication of User accounts
            </p>
            <p><b>User rights</b> <br/>
                The following are the rights you have regarding your personal information:
                Right to request or view your personal information which we have in our custody.
                Right to change, correct or rectify your personal information.
                Right to request deletion. You can withdraw your consent to the collection, storage and use of
                your personal information by requesting a deletion of your account.
                Any of the above requests can be made by sending us a message via the "contact us" link on
                our menu on the top right corner of the homepage or via our email; expressing and stating
                clearly, your requests.
            </p>
            <p><b>Modification to our Privacy Policy</b> <br/>
                TWP reserves the right to make modifications to our Privacy Policy where we deem necessary,
                with or without notifying you and such modifications will take effect, immediately upon its posting
                on the Platform. Hence, it's important that you check or revise our Policy regularly in case of
                modifications. Your continued use of our platform signifies that you agree to the our Policy, even
                when modified. <br/>
                If you do not agree with any modifications made, please do not continue to use Our Services.
            </p>
            <p><b>Feedback</b> <br/>
                If you have any questions, feedbacks or contributions, please contact us at:
                <a href="thewebtoonproject@gmail.com">thewebtoonproject@gmail.com</a> <br/>
                LAST MODIFIED: 20th January 2025
            </p>
        </div>
    </div>
        </div>
    </div>
  )
}

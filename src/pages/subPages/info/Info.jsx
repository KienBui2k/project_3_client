import React, { useEffect } from "react";
import api from "@api";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
export default function Info() {
    const { t } = useTranslation();
    const userStore = useSelector((store) => store.userStore);
    console.log("userStore", userStore);
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            window.location.href = "/";
        }
    }, []);
    return (
        <div>
            {t("info")}
            <button
                onClick={async (e) => {
                    if (!userStore.data?.email_confirm) {
                        let result = await api.users.resend();
                    }
                }}
            >
                {t("resend_email")}
            </button>
            <br></br>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    alert("đã gọi");
                    let result = await api.users.changePassword({
                        new_pass: e.target.new_pass.value,
                        old_pass: e.target.old_pass.value,
                    });
                    console.log("result", result);
                }}
            >
                {t("oldPass")}: <input name="old_pass" type="text" />
                {t("newPass")}: <input name="new_pass" type="text" />
                {t("confirmPass")}: <input name="renew_pass" type="text" />
                <button> {t("Change_password")}</button>
            </form>
        </div>
    );
}

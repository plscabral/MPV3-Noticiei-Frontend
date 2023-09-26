import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthGuard } from "./guards/AuthGuard";
import { GuestGuard } from "./guards/GuestGuard";

// pages
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Feed } from "../pages/Feed";
import { TermList } from "../pages/TermList";
import { TermCreate } from "../pages/TermCreate";

export function Routers() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<GuestGuard />}>
					<Route element={<SignIn />} path="/" />
					<Route element={<SignUp />} path="/criar-conta" />
					{/* <Route element={<ForgotPassword />} path="/esqueceu-sua-senha" /> */}
				</Route>

				<Route element={<AuthGuard />}>
					<Route element={<Feed />} path="/feed" />
					<Route element={<TermList />} path="/termos" />
					<Route element={<TermCreate />} path="/termos/criar-novo" />
					{/* <Route element={<CreateNewTicket />} path="/criar-ticket" />
          <Route element={<DetailTicket />} path="/detalhe-ticket/:ticketId" /> */}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

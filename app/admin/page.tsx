export default function AdminPage() {
  return (
    <main className="container pageFlow adminPage">
      <section className="adminHero" aria-labelledby="admin-title">
        <p className="type-meta">Restricted Access</p>
        <h1 id="admin-title" className="type-h1 adminTitle">
          Admin Gateway
        </h1>
        <p className="type-body-lg muted adminSummary">
          This route is protected at the Nginx edge with HTTP Basic Authentication.
          Unauthorized requests are challenged before this page is served.
        </p>
      </section>

      <section className="adminGrid" aria-label="Admin workspace">
        <article className="adminPanel" aria-labelledby="ops-title">
          <h2 id="ops-title" className="type-h2 sectionTitle">
            Operations
          </h2>
          <ul className="adminList type-body muted">
            <li>Portfolio root: `jakpakoun.com`</li>
            <li>Battle route target: `battle.jakpakoun.com`</li>
            <li>Admin challenge: HTTP Basic Auth via Nginx</li>
            <li>Admin audit log: `portfolio_admin_access.log`</li>
          </ul>
          <div className="adminActions">
            <a href="https://jakpakoun.com" className="actionPrimary">
              Open root site
            </a>
            <a href="https://battle.jakpakoun.com" className="actionLink">
              Open battle route
            </a>
          </div>
        </article>

        <article className="adminPanel" aria-labelledby="credentials-title">
          <h2 id="credentials-title" className="type-h2 sectionTitle">
            Credential Policy
          </h2>
          <p className="type-body muted">
            Credentials are issued manually. Rotate temporary passwords after every sharing
            event and avoid posting admin credentials in project chat logs.
          </p>
          <ul className="adminList type-body muted">
            <li>Use unique temporary passwords per session.</li>
            <li>Expire temporary access once the task is complete.</li>
            <li>Review admin access logs for failed attempts.</li>
          </ul>
        </article>
      </section>

      <section className="adminPanel" aria-labelledby="admin-request-title">
        <h2 id="admin-request-title" className="type-h2 sectionTitle">
          Access Request
        </h2>
        <p className="type-body muted">
          Access attempts to <code>/admin</code> are logged by the server. Submit your
          details to request credentials from the operator.
        </p>
        <form className="adminForm" action="mailto:jeanjacquesakpakoun@gmail.com" method="post" encType="text/plain">
          <label className="adminLabel" htmlFor="admin-email">
            Work Email
          </label>
          <input
            className="adminInput"
            id="admin-email"
            name="email"
            type="email"
            required
            placeholder="name@company.com"
          />

          <label className="adminLabel" htmlFor="admin-reason">
            Access Reason
          </label>
          <textarea
            className="adminInput adminTextarea"
            id="admin-reason"
            name="reason"
            rows={4}
            required
            placeholder="Describe the admin task you need to perform."
          />

          <div className="adminActions">
            <button type="submit" className="actionPrimary">
              Request credentials
            </button>
            <a href="/" className="actionLink">
              Return to portfolio
            </a>
          </div>
        </form>
      </section>
    </main>
  )
}

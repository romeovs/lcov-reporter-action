import {
	details,
	summary,
	tr,
	td,
	th,
	b,
	table,
	tbody,
	a,
	span,
	fragment,
} from "./html";

test("html tags should return the correct html", function () {
	expect(details("foo", "bar")).toBe("<details>foobar</details>");
	expect(summary("foo", "bar")).toBe("<summary>foobar</summary>");
	expect(tr("foo", "bar")).toBe("<tr>foobar</tr>");
	expect(td("foo", "bar")).toBe("<td>foobar</td>");
	expect(th("foo", "bar")).toBe("<th>foobar</th>");
	expect(b("foo", "bar")).toBe("<b>foobar</b>");
	expect(table("foo", "bar")).toBe("<table>foobar</table>");
	expect(tbody("foo", "bar")).toBe("<tbody>foobar</tbody>");
	expect(a("foo", "bar")).toBe("<a>foobar</a>");
	expect(span("foo", "bar")).toBe("<span>foobar</span>");
});

test("html fragment should return the children", function () {
	expect(fragment()).toBe("");
	expect(fragment("foo")).toBe("foo");
	expect(fragment("foo", "bar")).toBe("foobar");
});

test("html tags should accept props", function () {
	expect(a({ href: "http://www.example.com" }, "example")).toBe(
		"<a href='http://www.example.com'>example</a>"
	);
	expect(
		a({ href: "http://www.example.com", target: "_blank" }, "example")
	).toBe("<a href='http://www.example.com' target='_blank'>example</a>");
});

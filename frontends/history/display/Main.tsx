import { Cemjsx, Static, Fn, Func, Ref } from "cemjs-all"
import calendar from '@svg/ann/calendar.svg'

const RenderTable = function ({ items }) {

  if (!items) {
    return (
      <tbody class="history_table-body">
        <tr>
          <td>Пользовател не найдены.</td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody class="history_table-body">
      {
        items.map((item, index) => {
          return (
            <tr>
              <td class="history_table__cell">{(index + 1 + (Static.currentPage - 1) * Static.limitPerPage)}</td>
              <td class="history_table__cell">{item.LastName}</td>
              <td class="history_table__cell">{item.FirstName}</td>
              <td class="history_table__cell">{item.MiddleName}</td>
              <td class="history_table__cell">{item.DateOfBirth}</td>
              <td class="history_table__cell">{item.Email}</td>
            </tr>
          )
        })
      }
    </tbody>
  )

}

export default function () {
  return (
    <div class="history_inner">

      <div class="history_info">
        {/* <p class="history_info__text">Всего отправлено поздравлений: <span class="bold">55</span></p> */}
        {
          Static.record == null ? <p class="history_info__text"><span class="bold"></span></p> :
            <p class="history_info__text">Всего отправлено поздравлений: <span class="bold">{Static.response.logsCount}</span></p>
        }
        <div class="history_info__details">
          {
            Static.record == null ? <p class="history_info__text"><span class="bold"></span></p> :
              <p class="history_info__text">Вчера: <span class="bold">{Static.response.yesterdayLogsCount}</span></p>
          }
          {
            Static.record == null ? <p class="history_info__text"><span class="bold"></span></p> :
              <p class="history_info__text">Сегодня: <span class="bold">{Static.response.todayLgsCount}</span></p>
          }
          {
            Static.record == null ? <p class="history_info__text"><span class="bold"></span></p> :
              <p class="history_info__text">Завтра: <span class="bold">{Static.record.tommorowLogsCount}</span></p>
          }
        </div>
      </div>

      <div class="history_filter">
        <div class="history_filter__calendar">
          <img src={calendar} alt="Фильтр календар" />
        </div>

        <div class="history_filter__date">
          05.11.2023
        </div>
      </div>
      <div class='test-container'>
        <table class="history_table">
          <thead >
            <tr class="history_table-head">
              <th class="history_table__cell">№</th>
              <th class="history_table__cell">Фамилия</th>
              <th class="history_table__cell">Имя</th>
              <th class="history_table__cell">Отчество</th>
              <th class="history_table__cell">Дата рождения</th>
              <th class="history_table__cell">Email</th>
            </tr>
          </thead>
          <RenderTable items={Static.records} />
        </table>
        <nav class="pagination-container">
          <button
            class="pagination-button"
            aria-label="Previous page"
            title="Previous page"
            onclick={() => {
              if (Static.currentPage > 1) {
                Static.Pages.forEach(element => {
                  element.class = 'pagination-number '
                });
                Static.currentPage -= 1
                Func.pagination()
                Fn.init()
              }
            }}
          >
            &lt;
          </button>
          <div id="pagination-numbers" ref='paginationNumbers'>
            <span class='hidden' ref='first_two' >
              {
                Static.Pages?.slice(0, Static.outertDigitsNumber).map((item, index) => {
                  return (
                    <button class={item.class}
                      onclick={(e) => {
                        console.log('=1b0f05=', "first_two")
                        Static.Pages.forEach(element => {
                          element.class = 'pagination-number '
                        });
                        Static.currentPage = item.number
                        Func.pagination()

                        item.class += "active"
                        if (Static.currentPage < 3) {
                          Ref.first_two.classList.add('hidden')
                          Static.Begin = 0
                          Static.End = 5
                        }
                        Fn.init()
                      }}
                    >
                      {item.number}</button>
                  )
                })
              }
              <span class='dots' ref='first_two_dots'>...</span>
            </span>
            {
              Static.Pages?.slice(Static.Begin, Static.End).map((item, index) => {
                return (
                  <button class={item.class} ref="pagination_number"
                    onclick={(e) => {
                      Static.Pages.forEach(element => {
                        element.class = 'pagination-number '
                      });
                      Static.currentPage = item.number
                      Func.pagination()
                      item.class += "active"
                      Fn.init()
                    }}
                  >
                    {item.number}
                  </button>
                )
              })
            }
            <span class={["", Static.pageCount >= 5 ? "" : "hidden"]} ref='two_last'>
              <span class='dots'>...</span>
              {
                Static.Pages?.slice(-Static.outertDigitsNumber).map((item, index) => {
                  return (
                    <button class={item.class}
                      onclick={(e) => {
                        Static.Pages.forEach(element => {
                          element.class = 'pagination-number '
                        });
                        console.log('=d3212c=', "two_last")
                        Static.currentPage = item.number
                        Func.pagination()
                        item.class += "active"
                        if (Static.currentPage >= Static.lastPage - 3) {
                          Ref.two_last.classList.add('hidden')
                          Ref.first_two.classList.remove('hidden')
                          Static.Begin = Static.Pages.at(-6).number
                          Static.End = Static.lastPage
                        }
                        Fn.init()
                      }}
                    >
                      {item.number}</button>
                  )
                })
              }
            </span>
          </div>
          <button class="pagination-button" id="next-button"
            aria-label="Next page"
            title="Next page"
            onclick={() => {
              if (Static.currentPage < Static.lastPage) {
                Static.Pages.forEach(element => {
                  element.class = 'pagination-number '
                });
                Static.currentPage += 1
                Func.pagination()
                Fn.init()
              }
            }}
          >
            &gt;
          </button>
        </nav>
      </div>
    </div>

  )
}
import datetime as dt
import pytest

# ^^ going to be replaced by actual imports in the future

class TimelineEntry:
    def __intit__(self, entry_id, person_id, media_id, position_ts):
        self.entry_id = entry_id
        self.person_id = person_id
        self.media_id = media_id
        self.position_ts = position_ts


class InMemoryTimelineService:
    def __init__(self):
        self.entries = []
        self.next_id = 1

    def add_timeline_entry(self, person_id, media_id, position_ts):
        entry = TimelineEntry(self._next_id, person_id, media_id, position_ts)
        self._next_id += 1
        self._entries.append(entry)
        return entry

    def list_timeline(self, person_id):
        return sorted(
            [e for e in self._entries if e.person_id == person_id],
            key=lambda e: e.position_ts
        )

    @pytest.fixture()
    def timeline_service(self):
        return InMemoryTimelineService()

    def test_timeline_is_always_chronological(timeline_service):
        pid = 1
        # Add out-of-order dates: 2021, 2019, 2023
        t1 = dt.datetime(2021, 5, 1)
        t2 = dt.datetime(2019, 1, 1)
        t3 = dt.datetime(2023, 12, 31)

        timeline_service.add_timeline_entry(pid, media_id=1, position_ts=t1)
        timeline_service.add_timeline_entry(pid, media_id=2, position_ts=t2)
        timeline_service.add_timeline_entry(pid, media_id=3, position_ts=t3)

        entries = timeline_service.list_timeline(pid)

        # Extract just the timestamps
        times = [e.position_ts for e in entries]

        # Assert that the returned list is sorted ascending
        assert times == sorted(times), "Timeline is not in chronological order"

        # Also check expected order of media_ids
        assert [e.media_id for e in entries] == [2, 1, 3]